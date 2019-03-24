# Continues deployment with Kubernetes and Google Cloud

This is the easiest way to configure continues deployment using CloudBuild and
GKE.

You first have to connect and configure Google Cloud CloudBuild to connect to
Github. After that you configure it to use a `cloudbuild.yaml` which can contain custom steps.

That file needs to:

1. Build a docker image with the git sha
2. Push that docker image to Google Cloud Container Registry
3. Now render a new yaml file that contains a reference to the new docker image sha
4. Run `kubectl apply -f deploy.yml` to apply the new configuration.

It will look like this:

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/nodejs-cloudbuild-kubernetes/nodejs-cloudbuild-kubernetes:$COMMIT_SHA', '.']
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'gcr.io/nodejs-cloudbuild-kubernetes/nodejs-cloudbuild-kubernetes:$COMMIT_SHA']
- name: 'kevinsimper/render'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
      /render -f /workspace/kubernetes/deployment.yml -var sha=$COMMIT_SHA -o /workspace
      cat /workspace/workspace/kubernetes/deployment.yml
- name: 'gcr.io/cloud-builders/kubectl'
  args: ['apply', '-f', '/workspace/workspace/kubernetes/deployment.yml']
  env:
  - 'CLOUDSDK_COMPUTE_ZONE=europe-west4-a'
  - 'CLOUDSDK_CONTAINER_CLUSTER=staging'
```

### Step 4. running Kubectl

Normally CloudBuild will not have access to your Kubernetes cluster. A way to
get started would be to give your CloudBuild service account under IAM access as
a Google Cloud Cluster Developer.

That you can do under IAM in your project.

### Example

You can find a example repo of how it can be done minimally here

https://github.com/kevinsimper/nodejs-cloudbuild-kubernetes
