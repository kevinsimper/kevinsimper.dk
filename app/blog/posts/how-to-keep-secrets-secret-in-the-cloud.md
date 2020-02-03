# How to keep secrets secret in the cloud

![](https://i.imgur.com/V1SF7RA.jpg)

In this article, I want to show you how to do proper secret management that doesn't compromise on the easiness of use and works with any frameworks or programming language you use!

It is too easy to leak secrets knowingly and unknowingly, both because of programming mistakes and people have too wide access to the important stuff. 

The first example is storing secrets as environment variables. That is a bad idea for several reasons:

- Lots of programs when they crash will dump all environment variables as part of exiting, making it easier to debug, but that means that all your secrets will end up in the logs where they often are stored permanently for a long time.
- All code will have access to it, also all third party code that is loaded. That is not ideal and examples have been seen that compromised NPM modules or Ruby Gems have taken all environment variables and send it to a remote server.
- Environment variables are typically not encrypted and are easily accessed from the consoles or CLI where they are deployed from. That means that all developers typically have access to view environment variables and in that case the secrets. You can trust employees to not do wrong things, but that means only one programmer's laptop has to be compromised before all secrets are leaked to a potential hacker!

So for those reasons, nobody should store secrets as environment variables! I have done it myself before, and that was because of a combination of not knowing better and not knowing the right tools. If the correct solution is too complicated the incentive is not there to do the right thing.

## Enter project Berglas

Berglas is an open-source project that will help you store your secrets encrypted in a central storage place, then when you need those secrets it will exchange the right private key, decrypt the file and provide the secrets the place you want it. Super simple, but very secure and powerful.

Berglas CLI helps you automate the process with:

-  the initial setup
- updating secrets
- managing access to both humans and service accounts
- as an initializing program before your program starts

At the moment the depends on Google Cloud Storage and Google Cloud KMS (public/private key storage), but it runs on any server both inside and outside Google Cloud. The critical part is that it needs a storage and KMS service.

You can find it all here in the Berglas repo, but I will show you a short and concrete example here in the blog post!
https://github.com/GoogleCloudPlatform/berglas

## Example of Berglas

You need to have Google Cloud SDK installed on your computer and you can install Berglas from the instructions here: 
https://github.com/GoogleCloudPlatform/berglas#setup

What it tells you in short is:

1. install the cli
2. set the project id 
   `export PROJECT_ID=my-awesome-project`
3. set the bucket id where the encrypted secrets should be stored 
   `export BUCKET_ID=my-awesome-bucket`
4. enable the right services on your GCloud project
5. bootstrap with berglas 
   `berglas bootstrap --project $PROJECT_ID --bucket $BUCKET_ID`

### Creating secrets

After this we can now create a secret by doing a `berglas create`:

```bash
$ berglas create \
	${BUCKET_ID}/my-secret \
	my-data-to-be-encrypted \
	--key projects/${PROJECT_ID}/locations/global/keyRings/berglas/berglas-key
```

### Editing secrets

You can edit it again. `$ berglas edit ${BUCKET_ID}/my-secret`

However note you need to provide a editor in the terminal. They are defined by the EDITOR environment variable. Two exampels if you want to use vim

```bash
$ EDITOR=vim berglas edit ${BUCKET_ID}/my-secret
```

or if you want to use VS Code, notice the wait, that means that berglas will now when you have finished editing by you closing VS Code! You can try it out yourself on the commandline by doing `code --wait mytext.txt && echo hello`.

```
$ EDITOR="code --wait" berglas edit ${BUCKET_ID}/my-secret
```

"BUT hey, how does it know which KMS key to use?"

They do something clever where they store the key name as a Metadata attribute on the file in GCS, you can look it up yourself by using the Google Cloud storage cli  `$ gsutil stat`

```
$ gsutil stat gs://...
...
			Metadata:
        berglas-secret:     1
        berglas-kms-key:    projects/...
```

That is very clever and make it much easier to edit secrets and less tedious!

### Accessing secrets in your server program

Say we have a Node.js server, how do you access the secrets we just created?

```javascript
// server.js
const PORT = process.env.PORT || 9000
require('http').createServer((req, res) => {
  res.end('Hello secret: ' + process.env.MYSECRET)
}).listen(PORT, () => console.log('Listening http://localhost:' + PORT))
```

We have to use berglas syntax in our environment variables (coming back to that later!) to tell what secrets to fetch. As Google Cloud storage buckets are globally unique, we don't need to specify project id.

We run it with `berglas exec --` so it will look something like this:

```bash
$ MYSECRET=berglas://my-awesome-bucket/my-secret berglas exec --local -- node server.js
```

And then testing that it works:

```bash
$ curl localhost:9000
Hello secret: my-data-to-be-encrypted
```

This will access the key as your user, because you are authenticated with the GCloud SDK. It will only do it once, so if you update the secret, berglas will not know and you will have to restart the server.

### Accessing secret on a server

You are not logged in on remote servers as yourself and that is where service-accounts come in. For example Google Cloud Run, there will already be a service-account by default attached to your server. This helps in that you don't need to create a new one and configure that.

In the Cloud Run example, they show you show to find out the email of the default compute service-account and then give that account access to your secret. Nobody have automatically access to your secrets, it needs to be implicit given, unless you are a Owner/Editor of your Google Cloud Project, which you will be if you created the project.

You can see the Cloud Run node.js example here: https://github.com/GoogleCloudPlatform/berglas/tree/master/examples/cloudrun/node

It is easy to consume the `berglas` CLI in a docker image, as berglas is also distributed as a docker image and you can get it by:

```dockerfile
COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas
```

You can create a service account under IAM in the console and give it the following permissions:
https://github.com/GoogleCloudPlatform/berglas#create

Then you can use the Service Account JSON you downloaded and Berglas will know where to look for it: 
`export GOOGLE_APPLICATION_CREDENTIALS=/path/to/my/credentials.json`
https://github.com/GoogleCloudPlatform/berglas#authentication

## Not using environment variables to store the key

In my example I just showed above I used environment variable and it is a bad idea as we discussed in the introduction. So here is how to do it correctly:

First change the entry to output it as a file, two options:

```
berglas://my-awesome-bucket/my-secret?destination=tempfile
```

Will make a random file and instead give you the path as the environment variable, like `$TMPDIR/02131230`

or you can do 

```
berglas://my-awesome-bucket/my-secret?destination=./secrets/my-secret
```

and in your application you can do:

```javascript
// server.js
const { readFileSync, unlinkSync } = require('fs')
// like this
const SECRETFILE = './secret/my-secret'
const MYSECRET = readFileSync(SECRETFILE)
unlinkSync(SECRETFILE)
// or read it if it is a tempfile
const MYSECRET = require('fs').readFileSync(process.env.MYSECRET)
unlinkSync(process.env.MYSECRET)

const PORT = process.env.PORT || 9000
require('http').createServer((req, res) => {
  res.end('Hello secret: ' + )
}).listen(PORT, () => console.log('Listening http://localhost:' + PORT))
```

So to start it, it will look like this:

```bash
$ MYSECRET=berglas://my-awesome-bucket/my-secret?destination=./secrets/my-secret berglas exec --local -- node server.js
```

**Did you see in our code that we are deleting the secret after we read it?** That is so that it is much harder for secrets to be leaked. A hacker can't just read a file or an environment variable to get your secret if they want to find the secret they have to get it out of memory which is much harder.

## Conclusion

Storing secrets is more difficult than just storing it in plaintext, there is no doubt about that, but doing the right thing and not jumping over where it is lowest is required with secrets. If secrets are compromised the amount of time there will have to be spent is both larger and the potential damage for both customers and in reputation are often extremely large.

With Berglas it is easy to get started and the inertia is small if you begin to learn the tools and see it as a requirement instead optional. 

You will sleep better knowing you did a great job! ;)

---

Photo by [Stéphane Mingot](https://unsplash.com/@smingot)