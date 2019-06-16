# Continuous Deployment with Cloud Run and Cloud Build

Google recently launched Cloud Run at their Next 19 conference. It is a service where you provide it a Docker image and it then runs it, autoscaled up and down and you only pay for what you use, a really simple service that builds ontop of many years of work from Google and others, something we can now take advance of!

In this example I want to show how you can combine Cloud Build and Cloud Run, so that whenever you make a small change to your app, it deploys it automatically. Each service are super simple in their interface but to combine them takes a few extra steps.

Typically cloud provider, they try to provide building blocks that you can build and stack however you like, but they do sometimes allow you to combine them across. The reason why they try to not combine services is that it often introduces tight couples than makes the product slower to advance whenever customers first start to depend om them. So this article will maybe be irrelevant in the future but for now you have to do these things yourself!

You will need a Google Cloud account, you can get started for free entirely but you will need to put in a creditcard because they limit abuse.

[TOC]

## Create a small example app

Let us create a small app first that we will use. Let us create a small node.js server. If you already know how to do this you can skip to next section here:

### Creating a small node.js server

```javascript
// server.js
const http = require('http')
const PORT = process.env.PORT || 9000
http
  .createServer((req, res) => {
    console.log('New connection')
    res.end('Hello Cloud Run')
  })
  .listen(PORT, () => console.log('Listening on', PORT))
```

You can install node.js here: [https://nodejs.org](https://nodejs.org/)

From the command line we can test that it runs:

```
$ node server.js
```

and open up your browser on http://localhost:9000 (Protip: or use a tool like [httpie](https://github.com/jakubroztocil/httpie) and run `$ http :9000` in a new terminal window)

### Creating a docker image

When we have the small server working we can add a Dockerfile that describes how a Docker images can be created from our sourcecode. It is a small reciepe of build steps, in our case it will be fairly short.

```dockerfile
# Always good to specific so that it doesn't later break
FROM node:12.4
# This folder will all commands be run in, like the HOME folder
WORKDIR /app
# Add our sourcecode
ADD . /app
# The command to start our container
CMD node server.js
```

You can find all the [Dockerfile commands](https://docs.docker.com/engine/reference/builder/) here.

With that we can run

```bash
# the name "myapp" is something you can choose
$ docker build -t myapp .
```

and test it by running

```bash
$ docker run -it myapp -p 9000:9000 myapp
```

and test it again in the browser or in your terminal.

### Push it to Github

For this last step in creating our app we need to push it to Github. In theory you can host it anywhere, but this tutorial will focus on Github.

You can navigate to https://github.com and create a new repository and follow the instructions to on how to create a new git repository.

Protip: Use the tool hub from github to do it all from the command line. [http://hub.gihub.com/](http://hub.gihub.com/)

## Setting up Continuoes Integration with Cloud Build

The first step to Continuous Deployment is to have Continuoues Intregration configured (CI for short). Cloud Build is a service that runs on demand and executes a series of commands. You value is that you can easily configure it through the website and connect it with Github to setup webhook so that each time to commit Cloud Build will get notified. It is also really price efficient as you only pay per minute the builds are running, which is something really hard to build yourself.

With the code on Github, you go to Google Cloud and logs in. [https://console.cloud.google.com](https://console.cloud.google.com/)

### Creating a new project

It is a good idea to create a new Project on Google Cloud, as it makes it easy to test and teardown afterwards, and also for new projects to seperate them from others.

You can click the button next to the Google Cloud Platform logo, and then click "Create Project".

![google cloud choose project](images/ci-cloud-run/google-cloud-choose-project.png)

Then click the button to the right:

![google cloud select a project](images/ci-cloud-run/google-cloud-select-project.png)

It will suggest a name but you can choose your own:

![google cloud new project](images/ci-cloud-run/google-cloud-new-project.png)

After that it will take 30 seconds to create and you can watch the status by clicking the bell:

![google cloud Notifications](images/ci-cloud-run/google-cloud-notifications.png)

You will be redirected to the new Project and you can see the Project Info:

![Google Cloud Project info](images/ci-cloud-run/image-20190615234621009.png)

### Setting up Cloud Build

Then we can setup Cloud Build, navigate to Cloud Build either through the Sidebar or the search field.

![Google Cloud Search Bar Cloud Build](images/ci-cloud-run/BQ3v1KJ.png)

Here you have to first activate the API, go ahead click "Activate":

![Google Cloud Cloud Build Activate api](images/ci-cloud-run/image-20190615222934553.png)

When it has activated, click Create Trigger

![Google Cloud Cloud Build Create trigger](images/ci-cloud-run/image-20190615223030269.png)

Select Github as that is where we have hosted our app and click continue.

This will prompt you to Authorize Google Cloud to have access to your Github Repositories:

![Google Cloud Cloud Build Create Trigger Select source](images/ci-cloud-run/image-20190615223101488.png)

After your authorized the app, you will be able to see all your repositories, search and find the GitHub repo created:

![Google Cloud Cloud Build Select Repository](images/ci-cloud-run/image-20190615223340402.png)

The last and 4th step provides a really long form. Most of the fields is related to when it should trigger a build and by default it will trigger on every commit on every branch.

![Google Cloud Create Trigger Trigger settings](images/ci-cloud-run/image-20190615223808306.png)

You want to look at the last part of the form related to **"Build configuration"**:

Here it will by default build a Dockerfile that it expect to find in the root.

It even showcases what command it will execute with Docker. There is only 1 field I normally change, that is the Image name, I think it is too long by default, so I change it to this pattern `gcr.io/PROJECT NAME HERE/GITHUB REPO NAME:$SHORT_SHA`.

The Project name is required and can't be changed, only after the second slash.

![Google Cloud Cloud Build Configuration](images/ci-cloud-run/image-20190615223932129.png)

So I change this field to not include "github" and so forth and click Create Trigger.

![Google Cloud Cloud Build Image name](images/ci-cloud-run/image-20190615224613210.png)

You have now created your first trigger, awesome!

![Google Cloud Cloud Build Build Triggers](images/ci-cloud-run/image-20190615224256922.png)

You can try it out by click "**Run Trigger**" and then selecting the branch, we only have "master" for now, click that.

![Google Cloud Cloud Build Started](images/ci-cloud-run/image-20190615224409490.png)

You can then watch the build logs and see the Docker image being built with the steps in it.

When it is done it has pushed a Docker image to GCR (Google Cloud Registry)

```
Pushing gcr.io/cloud-run-cd-example/cloud-run-continuous-deployment-example:244a988
```

![image-20190615225910647](images/ci-cloud-run/image-20190615225910647.png)

Congratulation, now everytime you make a commit on your github.com repo you will trigger a new Cloud Build that will push a image to GCR.

## Deploying and running on Cloud Run

With a Docker image ready, let us set up Cloud Run. Let us search for it in the search bar (Protip: Use "/" to go directly to the searchbar from the keyboard).

![Google Cloud search bar Cloud Run](images/ci-cloud-run/image-20190615230405414.png)

We have to also activate this API the first time we use it:

![Google Cloud Cloud Run Activate API](images/ci-cloud-run/image-20190615230858687.png)

When it has been enabled, we can click "Create Service"

![Google Cloud Cloud Run dashboard](images/ci-cloud-run/image-20190615231019863.png)

Here we first have to select our image from Container Registry, the one we built on Cloud Build. We do that by clicking "SELECT".

![Google Cloud Cloud Run Create Service](images/ci-cloud-run/image-20190615231308082.png)

You can click the small arrow to select the specific sha, you can see here that I have to different images already. One can have many versions of a Docker image.

![Google Cloud Cloud Run Select container image](images/ci-cloud-run/image-20190615231423535.png)

After that it will automatically suggest a name:

![Google Cloud Clud Run Container Image URL](images/ci-cloud-run/image-20190615231542028.png)

We will choose us-central-1 as that is the only region we can choose for now, but I would guess that there would be many more in the future.

![Google Cloud Cloud Run Location](images/ci-cloud-run/image-20190615231613911.png)

We will tick this box to allow visits from the internet, this is because you can limit the service to only be accessed from inside the Google Cloud project network.

![Google Cloud Cloud Run Allow unauthenticated](images/ci-cloud-run/image-20190615231710497.png)

And then click "CREATE".

Then you should see that it is creating

![Google Cloud Cloud run Creating service](images/ci-cloud-run/image-20190615231747269.png)

and after 1-2 minute a URL will show up for your new Cloud Run service.

https://cloud-run-continuous-deployment-example-ck56oxnv5q-uc.a.run.app/

![Google Cloud Cloud Run deployed service](images/ci-cloud-run/image-20190615232102408.png)

This is pretty awesome, we build an app with docker, uploaded it to github, built it on Google Cloud with Cloud Build and now launched it with Cloud Run. All in fairly short time and we will only pay whenever it runs, so no big monthly fees for something that you only use a couple of times. Pay for what you use.

![Deployed service to Cloud Run](images/ci-cloud-run/image-20190615232756202.png)

## Deploy a new version manually

So now when you push to github it will build a new docker image on Cloud Build. When that is done, you can either copy the docker image address or use the same dropdown to select the newest Docker image.

Try updating the `res.send` function to

```
res.end('Hello Cloud Run v2 ' + new Date() )
```

and commit and push it to Github.com

Check out Cloud Build again:

![Google Cloud Cloud Build dashboard](images/ci-cloud-run/image-20190615233105594.png)

Click "Deploy new revision"

![Google Cloud Cloud Run Deploy new revision](images/ci-cloud-run/image-20190615232637074.png)

And now "Select" or paste the new Google Cloud Registry image.

![Google Cloud Cloud Run select new image](images/ci-cloud-run/image-20190615232715805.png)

and click "Deploy"

https://cloud-run-continuous-deployment-example-date-ck56oxnv5q-uc.a.run.app/

![Second version deployed to Cloud Run](images/ci-cloud-run/image-20190615233303040.png)
