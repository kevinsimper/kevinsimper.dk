# How to make authentication with Github Apps for side projects

Making a secure way to log into your app can be difficult. On top of making login secure you have to implement a lot of other features like "forgot password" and 2-factor. These features are essential but do not bring add that much value, so why not leverage other platforms that already implemented all this.

I want to encourage doing this for side projects espically since writing and maintaining auth and authorization as the code in this example is very small once you know how. Doing it with GitHub is also useful if your audience is developers as they likely already have an account.

GitHub also introduced "GitHub Apps", which is their improved platform that allows better permissions compared to the previous which had really broad permissions.

## How does it work?

We need to know who a user is. We want to ask GitHub to ask the user if they want to forward the user's information to us. So the user starts on our website, they click "Login with GitHub" and we redirect them to github.com with 2 parameters:

- the unique id of our GitHub app
- the url the user should be redirected back to

In our GitHub app, we have already configured that we want read-only access to the user's email.

The user is then greeted with a page that asks if they want to give us the information. When they do they are redirected back to our website with a short code in the URL. That short code string we can exchange for an api access token by sending it to the GitHub api together with our client id and client secret.

With the access token, we can fetch all the data from the api, like the user's email and GitHub user id that we can save to our database to know who next time they log in.

## Example with Node.js

Let us create a small Node.js example app.

### Creating your first GitHub app

We first need to create a GitHub App, that can be done here:

https://github.com/settings/apps

You need to fill out name, homepage url. You can deactivate the Webhook by unticking the Webhook.

In the homepage url you can put in "http://localhost:9000" which we are going to use when developing locally.

Fill it out like this:

![Register new GitHub App](images/github-auth/new-github-app.png)

### Creating the node.js server

Ensure that you have Node.js installed and create a new folder on your computer.

We are going to use Express.js as it allows use some convenience with routing and redirects.

```
$ npm init -y
$ npm install express esm
```

and we can create a `server.js`

```javascript
import express from 'express'

const app = express()
app.get('/', (req, res) => {
  res.send('Hello GitHub auth')
})
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Listening on localhost:' + PORT))
```

Open `package.json` and add a new script to start the server

```javascript
"scripts": {
	"start": "node -r esm server.js"
}
```

We are using esm to use new ESNext `import` , which also works nicely with TypeScript if we want to convert it.

### Saving GitHub App credentials

We need to take the client id and client secret and store it in a way we can use it in our application.

![GitHub App Credentials](images/github-auth/github-app-credentials.png)

(You don't need to generate a private key now)

We could store it in our code but that is a bad practice as we don't want to store secrets in our source code and it also makes it harder to change.

A good start will be storing it as environment variables. We can use a npm package called `dotenv` which will load a file called `.env` and populate the process.env. This is smart as we can put that file in our .gitignore.

```bash
GITHUB_CLIENT_ID=yourid
GITHUB_CLIENT_SECRET=yoursecret
```

and we can install dotenv

```bash
$ npm i dotenv
```

and we can update our `npm start` script to require dotenv

```diff
 "scripts": {
-  "start": "node -r esm server.js"
+  "start": "node -r esm -r dotenv/config server.js"
 }
```

and to test it you can now use this in your code:

```
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
console.log({ client_id, client_secret })
```

### Redirect to GitHub

The first thing we need to add is redirect to GitHub. We do that by adding a new route.

```javascript
app.get('/login/github', (req, res) => {
  const redirect_uri = 'http://localhost:9000/login/github/callback'
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      process.env.GITHUB_CLIENT_ID
    }&redirect_uri=${redirect_uri}`
  )
})
```

After that if the user agrees with the GitHub prompt, she will be redirected back to the `redirect_url`.

### Redirect route

GitHub sends a `code` along as a URL query parameter, this we can grab with express with `req.query.code`.

```javascript
app.get('/login/github/callback', (req, res) => {
  const code = req.query.code
  // next step here
})
```

We need to take that code and exchange it for a access token from the GitHub API. We can use the javascript `fetch` . I recommend using that in Node.js as well as it make you remember the api better for next time you want to use it in the browser.

It has been made in the npm package called `node-fetch`, so we need to install that.

```bash
$ npm install node-fetch
```

Now we can include it at the top and begin making our function to get the token.

```javascript
import fetch from 'node-fetch'

async function getAccessToken({ code, client_id, client_secret }) {
  const request = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  })
  const text = await request.text()
  // text contains the response
}
```

In the above function we made a http call to github, marking it as a POST request and the content type to JSON. Providing `client_id` and `client_secret` as arguments allows us to easily move the function to another file with little refactoring.
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github

We then get a response back and here is the special part, it is a text string containing keypairs with = and & between. I am not sure why they don't respond with JSON, but let us parse that. Node.js has built in the `URLSearchParams` that the browser also has, which lets us easily get the `access_token` out of it. You can read about it here: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

But it looks like this:

```diff
 async function getAccessToken(..) {
   ...
   const text = await request.text()
+  const params = new URLSearchParams(text)
+  return params.get("access_token")
 }
```

Now we can use it in our redirect route:

```diff
+ const client_id = process.env.GITHUB_CLIENT_ID
+ const client_secret = process.env.GITHUB_CLIENT_SECRET
  app.get('/login/github/callback', (req, res) => {
    const code = req.query.code
+   const access_token = getAccessToken({ code, client_id, client_secret })
  })
```

Now we can get the users profile from the GitHub api:

https://developer.github.com/v3/users/

```javascript
async function fetchGitHubUser(token) {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + token
    }
  })
  return await request.json()
}
```

We can then use that to check if the user is who we expect:

```diff
 app.get('/login/github/callback', (req, res) => {
   const code = req.query.code
   const access_token = getAccessToken({ code, client_id, client_secret })
+  const user = fetchGitHubUser(access_token)
+  if (user.id === 1126497) {
+    res.send('Hello Kevin Simper')
+  } else {
+    res.send('Not Authorized!')
+  }
 })
```

### Using cookie session to keep logged in

We can easily utilize cookie session to keep us logged in and without using any database. All information will be stored in the cookie that only the backend can read, but as everything is sent with each request we can not store a lot of information.

We will use the npm package called "cookie-session" that works with express.js.

```bash
$ npm install cookie-session
```

In our app at the top we can include it and initialize it:

```diff
  import express from 'express'
+ import cookieSession from "cookie-session"

  const app = express()
+ app.use(
+  cookieSession({
+    secret: process.env.COOKIE_SECRET
+  })
+ )

  app.get('/', (req, res) => {
    res.send('Hello GitHub auth')
  })
...
```

Notice that we used a new environment variable. To ensure that only we know the content of the cookies and can update it, we need to put a secret. This can be anything, but don't make it something easy to guess!

Update the `.env` file with the secret:

```diff
  GITHUB_CLIENT_ID=yourid
  GITHUB_CLIENT_SECRET=yoursecret
+ COOKIE_SECRET=bongocat
```

Now we have access to an object on the request handler called `session`. Here everyone on this object is loaded from the cookie from the client on each request and updated when we update the object.

So now when the user has successfully logged in from GitHub, we can set their GitHub access_token and id.

```diff
 app.get('/login/github/callback', (req, res) => {
   const code = req.query.code
   const access_token = getAccessToken({ code, client_id, client_secret })
   const user = fetchGitHubUser(access_token)
-  if (user.id === 1126497) {
-    res.send('Hello Kevin Simper')
-  } else {
-    res.send('Not Authorized!')
-  }
+  if (user) {
+    req.session.access_token = access_token
+    req.session.githubId = user.id
+  } else {
+    res.send('Login did not succeed!')
+  }
 })
```

Notice that we don't assign the whole `user` object to session as that would make the cookie really large in size and transferring that between HTTP calls would not be efficient!

Now we can now the user is authenticated on each request by looking in the `req.session` object.

Now let us make an admin area.

```javascript
app.get('/admin', async (req, res) => {
  if (req.session && req.session.githubId === 1126497) {
    res.send('Hello Kevin <pre>' + JSON.stringify(req.session, null, 2))
    // Possible use "fetchGitHubUser" with the access_token
  } else {
    res.redirect('/login/github')
  }
})
```

And a log out function to destroy the token is made by assigning `req.session = null`.

```javascript
app.get('/logout', (req, res) => {
  if (req.session) req.session = null
  res.redirect('/')
})
```

## Conclusion

GitHub is easy to integrate with and the value you get out of GitHub is high security login and very ideal for side projects instead of implementing your own authentication.

PRO TIP: You can also offer to store the users information on GitHub, this way you don't need a database, even better for a side project!

For security do not to depend on the user id from github and not the email for example, as a user can switch their email.

From here you if you want other developers to use your GitHub app you have to update the settings to allow others. Do that from you Developer Settings on github.com.

If you have any questions or want to show me your implementation please send me an email, I would love to chat! 😄

---

Thanks to (Abdallah)[https://aabedraba.com/] for reading draft.
