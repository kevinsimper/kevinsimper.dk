# How we do Docker Multistage builds and share Github private repositories

At Connected Cars, we wanted to share private git repositories between projects and so we needed to authenticate with Github. In node.js you can put a git repository as the dependency and npm will know that it should do a `git clone` instead of fetching it from the npm repository.

So locally you will be able to use your own ssh key when you do npm install, so that is pretty easy.

There is, however, a problem with ssh keys with the ssh-agent and docker as you can not mount that socket inside the docker build process, so there are three solutions that could solve that problem:

  1. **You can add your ssh key inside the docker image and start an ssh-agent during the build.**

      It is generally not a good idea to move your ssh key around as it becomes more difficult to keep it safe. The docker image will however not leave your machine.
  2. **You can generate a private access token to use to authenticate with Github.**

      With that token, you can communicate with Github over HTTPS instead of SSH and it can be revoked. It has the benefit of being more likely to be shortlived by Github tokens can not be expired so it is nearly the same as SSH tokens. One thing to consider is that it is needed inside the package.json and you don't want to commit it.
  3. **Do an npm install outside the docker build and rebuild any native
      dependencies.**
      
      This will solve the problem with not authenticating inside the build process but it makes it take more steps that have to be done in the correct order and it would require you to have the same version of the tool that installs the dependencies. A process that can run solely inside docker build can easier be debugged.

So there are solutions to authenticate with Github but no clear out of the box solution. So here solution we have now and how we solved it.

## Build and continuous integration

On our build server, we have created a new GitHub user that has access to those
repositories that other projects want to clone. With that user, we created a personal access token and stored that encrypted in Googles secret storage called KMS (Key Management Service). When the build is started, the key is fetched and decrypted and passed as an environment variable to the build process. The idea is that everybody that has access to builds does not need to know what the token and to avoid others to get a hold of it.

We then created a script which replaces the `git+ssh` to `git+https` and includes the token like this `git+https://<token>:@github.com/owner/repo.git`.

The good thing about this is the same thing can be done locally to match the build environment. A general access token can be added to your `.bashrc` and `.bashprofile` and can be passed to the docker build process.

So this package url:
git+ssh://git@github.com/connectedcars/awesome-module.git
becomes
git+https://ACCESSTOKENHERE:@github.com/connectedcars/awesome-module.git

The node.js that does the replacement is called `npm` and added to the docker image `$PATH` which means that the developers using the image does not need to do anything different than they normally do like `npm install`. After `npm install` has run it will revert it back to the previous URL so that it is not saved in the docker image layer.

I will open source soon the docker image we use for replacing the string, but it can be done pretty quickly with `sed`.
```
$ sed -i '' 's/git\+ssh:\/\/git/git\+https:\/\/ACCESSTOKENHERE:/g' package.json
```

So explaining the command:
 - `sed` is a streaming editor
 - `-i` tells it to save it directly back to disk
 - `''` OS X requires the extension to be explicitly specified
 - `'s/git\+ssh:\/\/git/git\+https:\/\/ACCESSTOKENHERE:/g'` basically replaces one for the other, however, it looks weird because `/` and `+` has been escaped by adding a `\` before because else sed will think it is something that it should execute.

You can replace access token with `$GITHUB_AT` by changing the single-quotes to double quotes and bash will replace it with the correct value.

`"s/git\+ssh:\/\/git/git\+https:\/\/$GITHUB_AT:/g"`

## Passing Github Access Token to docker

To pass the token you can give an environment variable to the `docker build` command by using `--build-args GITHUB_AT=secrettoken` and then adding the same name as property in the dockerfile like following

```
# Dockerfile
FROM ...

ARG GHTOKEN
```

And to make it easy for local testing with `docker-compose` it will be added like this:
```
# docker-compose.yml
version: '2'
services:
  web:
    build:
      context: .
      args:
        - GITHUB_AT=$GITHUB_AT
```

It will take an environment variable you have placed in your bash profile and give it to `docker-compose`.

## Docker Images

We also want to have a base node.js image that will allow us to upgrade and easily customize the image we use and include the modified `npm` command. We also want to add custom scripts like the one doing the GitHub authentication so that it does not need to be fetched or copied into every project.

From that base image, there will be two images, one for build that will contain all the tools like a compiler for native dependencies and one for production that is slimmer and does not contain the tools for building.

So the main image will be called
```
connectedcars-node
```

That image will be tagged with the version of node. Then from that image there will be an image called:
```
connectedcars-node-build
```
which will contain as the official node.js docker image says it, _has a large number of extremely common Debian packages_

and the final image that will only have node.js to run it in production will be called:
```
connectedcars-node-production
```

Those two images can be used in conjunction with a docker multistage build, that is where you take the output of one container and put it into another container. This is to avoid having to extra packages that you don't need in the final image.

### Multi-stage builds

This is how we do multistage builds. You can see the first container called `builder` contains tools to build the final source code and then in the last section uses `COPY --from=builder` takes the output of `builder` and into the final image.

```
FROM gcr.io/connectedcars-staging/connectedcars-node:9.3 as builder

ARG GITHUB_AT

WORKDIR /app

RUN apt-get update && apt-get install -y mysql-client

ADD . /app

RUN yarn global add node-gyp

RUN yarn

# Set environment to production to ensure webpack complication is optimized
ENV NODE_ENV production

RUN npm run compile

RUN rm -rf node_modules && yarn



FROM gcr.io/connectedcars-staging/connectedcars-node-production:9.3

ENV NODE_ENV production

WORKDIR /app

EXPOSE 9000

COPY --from=builder /app .

CMD npm run production

```

That meant with these changes to the docker images that we went from an image with the size of 1.2 GB to an image half the size on 600 MB.

## Google Cloud Builder

At the moment we use Google Cloud Builder as it is very simple and has very low entry barrier. We have a custom config that you put inside the repository called `cloudbuild.yml`. It combines all the things above, `KMS` + `GITHUB Access Token` + `Docker multi-stage`.

The most interesting is the way `GITHUB_AT` get passed around and importantly Google Cloud Builder will only assign a value to the environment variable if it is a shell that you can see is done with `entrypoint: 'bash'`.


```
# cloudbuild.yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  entrypoint: 'bash'
  args: ['-c', 'docker build --build-arg=GITHUB_AT=$$GITHUB_AT --tag=gcr.io/awesome-connected-cars/$REPO_NAME:$COMMIT_SHA --file=web/Dockerfile .']
  secretEnv: ['GITHUB_AT']
secrets:
- kmsKeyName: projects/awesome-connected-cars/locations/global/keyRings/awesomebuilder/cryptoKeys/bob-the-builder
  secretEnv:
    GITHUB_AT: ASECRETTODECODE==
images: ['gcr.io/awesome-connected-cars/$REPO_NAME:$COMMIT_SHA']
```

You can read more about Google Cloud Builder here: https://cloud.google.com/container-builder/

## Conclusion - private Github repositories and smaller images

The solution is quite simple but requires a lot of small pieces to come together and a few different environments to work and test, but the final solution is something that can be shared across the organization and scale securely as we add more awesome colleagues without compromising on security which is the most important thing.
