# Publishing gcphelp cli - improving working with kubernetes on Google Cloud

I just published a new npm package called "gcphelp", which is to help working with Kubernetes on Google Cloud.

https://www.npmjs.com/package/gcphelp

## Switching Google Cloud Projects

On Google Cloud, the recommended way of separating resources is by creating new projects. It is a really great way and allows you also easy to test out new stuff and delete the project later ensuring that nothing is left behind.

That, however, means switching projects a lot! The way to do that is first to get the list of projects by doing `gcloud projects list`, get the id of the project, not the name! Now run `gcloud config set project ID`.

So to help with that, `gcphelp` exposes a cli tool called just `project`. It is easy to remember and short, and I know it can collide with other tools, but that can be worked out by switching it in the future.

So now you when you run `$ project`, you get a list of projects, navigate with the keyboard and press enter, the project has been switched!

## Getting credentials for Kubernetes clusters

Working with Kubernetes on Google Cloud, you are often switching between clusters, first because of different projects (production, staging, dev, dev1), but then also inside each project because of multiple teams or apps.

So getting the credentials to a cluster, you would first have to know the cluster name, you get that by `gcloud container clusters list` and then you can run WITH the region as well: `gcloud container clusters get-credentials NAME --region REGION`

So with the that, `gcphelp` exposes a tool called just `cluster`, again easy and short, and it execute those tool commands, the `get-credentials` that most annoyingly needs a region even though it could find a cluster with that name and see if there is only one, exactly what the CLI does instead.

## Switching namespaces in Kubernetes

When you work with Kubernetes, you are often looking at different namespaces, this is not specific to Google Cloud, but it fits into the workflow of something you do a lot on GCP.

You only look at one namespace at a time, and you can see all namespaces if you add `--all-namespaces` however you are normally looking in the `default` namespace unless you change it. The cli tool `kubectl` is used but it is a bit complicated. First you need to know the namespace, you can get that easily by `kubectl get ns`, however, to change it, `kubectl` expects the current context to be passed as an argument like this: `kubectl config set-context $(kubectl config current-context) --namespace=${ns}`, making it a super long command.

So with that, `gcphelp` exposes a tool called `namespace` that does so those two things for you in a easy to navigate way.

---

## Installing and using it

```
npm install gcphelp -g
```

I really hope you like it, try it out and see if it helps you! You can also find the source code on github and read exactly how it is done. https://github.com/kevinsimper/google-cloud-kubernetes-cli-helpers
