# How to get started with Bazel build tool

tldr; find the repo here: https://github.com/kevinsimper/beginner-bazel-example-docker

Bazel is a tool for managing builds, it can help you where one tool depend on the other. Here is what happens very often today, in your project or company you have an application, you make test to ensure that the application works properly. As the project grows running all the tests takes a long time, even if you make a small change in a place of a big app, all the tests still runs even though they are unrelated.

An easy way to solve is to look what has changed and then only trigger those tests, done right? No, what if you have code A and B that both depends on C. If you change something in A, only A's test can run, but what if you change something in C, now both C, A, B's tests should run. So the solution is to define that relationship of C? 

Yes, that is what bazel will do for you! It will help you calculate based on files that has changed, figure out what builds needs to be done and run them in the correct order.

## Bazel.build

Bazel is a tool built by Google, there is a few tools like it from many of the big tech giants as they all have this problem of sharing code between engineers. Reading the documentation it is very clear that it is very clever people that has built it and that it caters to people that has really hard problems to solve.

Problems they are trying to solve is that their builds are taking too long, which at Google every hour of a huge company counts. Also avoiding mistakes, as even small mistakes in applications that runs on many servers can have big consequences.

## Review of getting started

As mentioned, the documentation is very focused on difficult problems, the first tutorial they mention is for C++ which is a really lowlevel programming language. It sets the tone.

Reading further it has built a lot of tools to tackle certain problems like mobile applications and it looks like you have to use these specific functions like `ios_application` or `cc_binary` which look foreign.

## Bash commands to the rescue

Everyone knows how to execute bash commands, that is how most small/medium size projects are build. I personally use Docker to encapsulate those builds processes and I was looking at how I could just use those.

First I thought I had to use "Shell" which is under the "Build Encyclopedia" section in the documentation. 

But! You actually have to use the "genrule" to get started, which stands for "generic". https://docs.bazel.build/versions/master/be/general.html#genrule

## Let's try it out

But hold on, let first build a simple node.js application.

First let create a folder called `myproject`.

Inside that folder create a new folder called `backend` and create two files: `server.js` and `Dockerfile`

```javascript
// server.js
const http = require('http')
const PORT = process.env.PORT || 9000
const server = http.createServer((req, res) => {
	console.log('New connection')
	res.end('Build with Bazel')
}).listen(PORT, console.log('Listening on localhost:' + PORT))
```

```dockerfile
# Dockerfile
FROM node:12

WORKDIR /app

ADD . /app

CMD node server.js
```

We can test that by building it first:

```
$ docker build -t myproject-backend .
```

and then running it:

```
$ docker run -p 9000:9000 myproject-backend
```

And you can now see it running! So far so good. Let us try building it with Bazel.

## Getting bazel set up

There is many ways to install bazel, you can look on this page: [Installing Bazel](https://docs.bazel.build/versions/master/install.html) or install it easily on mac with brew: `$ brew install bazel`

The first thing we need to set up is a way for bazel to know what is the root of our project. We do that by creating a file called `WORKSPACE`, it should not contain anything.

Our project now looks like this:

```
myproject/
  WORKSPACE
  backend/
  	server.js
  	Dockerfile
```

Now we need to get started with our build file, bazel uses files called `BUILD` with no fileending either. We have to create that file inside each app we want to build, this way we define the root of each library or app.

So create it inside `backend` folder.

Now we can use our first rule called `genrule`. We need to give it a `name`. Then we need to tell which `srcs`files it has to watch for changes and that will be used in the build. We need to tell what `cmd` it should run. And lastly we need to tell it a file that defines that it went well.

So let us first start with the simplest build we can do. Reading from one file and outputting it to another.

```
genrule(
  name = "build"
  srcs = ["server.js"]
  cmd = "cat server.js > server.build.js"
  outs = ["server.build.js"]
)
```

That looks simple, however it will NOT work because of 1 important reason!

Whenever bazel runs a build it set up a new temporary folder and run all the commands in that! It will isolate the build so that you can only use the files that you define in your script! This is to prevent errors and misconfigured builds that depends for example on other builds output. This is a good feature but was really tricky for me to understand at first!

So `server.js` will be there, but you will have to write `server.build.js` to a specific folder so that bazel knows it is the correct output of that command. Bazel has a few commands to help with this, you can see them here, [bazel make commands](https://docs.bazel.build/versions/master/be/make-variables.html). But it is basically a bash function like this  `$(location)`.

So our build will look like this:

```
genrule(
  name = "build",
  srcs = ["server.js"],
  cmd = "cat $(location server.js) > $(location server.build.js)",
  outs = ["server.build.js"]
)
```

## Running our first Bazel build

Great now we need to run it!

Bazel has a few ways that it does thing cleverly. It defines `//` as root, and to reach our task called `build` we need to give the path to our app which is `backend`. So that gives us `//backend:build`. It looks weird but it has a powerful function you can read a lot more about later here, [bazel target patterns](https://docs.bazel.build/versions/master/guide.html#target-patterns)! But try to run this first:

```bash
$ bazel build //backend:build
```

If it is the first time you will notice that bazel is starting a daemon service up, this is so that it can keep state and quickly notice if files has changed.

Let us look for `server.build.js`

```bash
$ bazel build //backend:build
INFO: Analyzed target //backend:build (1 packages loaded, 2 targets configured).
INFO: Found 1 target...
Target //backend:build up-to-date:
  bazel-bin/backend/server.build.js
INFO: Elapsed time: 0.382s, Critical Path: 0.07s
INFO: 1 process: 1 darwin-sandbox.
INFO: Build completed successfully, 2 total actions
```

You can see that it wrote the file to `bazel-bin/backend/server.build.js`. That is because bazel is mostly used to create binary files, but here we just have a text file. But you can notice that the folder structure is the same inside `bazel-bin` as our app.

You can also notice how bazel is working by looking at the `srcs` in the genrule. It will only run the command whenever the sourcefile changes. This is what later will allow you to compile really big apps incrementally later!

## Running Docker CLI from Bazel

Docker is a bit of a different tool in that it doesn't produce binaries. You can export a docker image as a binary but generally we let the docker daemon (or underneath containerd) keep track of it. That is also what allows to quickly run it afterwards. However bazel keeps tracks of files and since we want to keep it simple and just use bash commands we have to force it outputting a file of some kind. Luckily we can make docker output the sha of our docker build which is a fine indicator, because bazel will also keep track of the output file! It is not just a few bash script hacked together!

We are going to use the same `genrule`. However one more thing about bazel is that it uses **symlinks**. Remember before when I said it isolates the build, it doesn't actually copy the files it only makes a reference to the file, this to avoid copying data which is slow. A symlink is a very few bytes.

That means that `docker build -t backend .` will not work as it will copy the symlinks into the container and not the actual content of the files. We can however use `tar` which is very efficient and can be made to follow symlinks when it packages a folder. So our command will look like this:

```bash
$ tar -czh | docker build -t backend -
# c = create | z = compress | h = follow symlinks
# the dash "-" at the end of docker build says to docker to expect a stream
```

So delete the old command and our file will look like this:

```
genrule(
  name = "build",
  srcs = ["Dockerfile", "server.js"],
  cmd = "tar -czh . | docker build -q -t backend -f backend/Dockerfile - > $@",
  outs = ["imagesha.txt"]
)
```

There is a few more things to explain:

- -q = docker will keep quite and only output the sha of the build, remove for debugging
- the files will still be relative to root, so all files will be under "backend/"
- since there is only one "outs", it can be replace with `$@`, so it is the same as `$(location imagesha.txt)`

Now try to build your container with bazel by running:

```
$ bazel build //backend:build
```

Now either look in the file `bazel-bin/backend/imagesha.txt` or `$ docker images` .

## Conclusion

Congrats you built your first container with bazel! This was not easy, but not difficult either and we just got started with some of the smart stuff!

Try placing around with the `srcs` in your `BUILD` file. Notice how it only changes when your content of those files changes! You can define more files or use the [`glob`](https://docs.bazel.build/versions/master/be/functions.html#glob) function to define more files you want to include in your build!

We can also use bazel to deploy our app. It is perfect for that seneraio also, as we will then only deploy our app when it has actually changed!

You can find all the code here in this Github repository: [beginner-bazel-example-docker](https://github.com/kevinsimper/beginner-bazel-example-docker).

### Next tutorial

In the next tutorial we will create one more app and a share library between those two apps and see how they both will build when we change the shared library! We will also look at how to run our new docker image with docker with bazel! Subscribe to the newsletter to be notified! 😄