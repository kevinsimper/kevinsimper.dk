# Trigger a redeploy in Kubernetes

Sometimes you want to redeploy a service when a external change happens, but sadly there is no straight forward way to simply redeploy or rotate a deployment.

It can also be that you update a configmap and want to trigger a deployment of a service.

You can delete and reapply the service, but that would give you downtime.

### Using kubectl patch

We can use `kubectl patch` to trigger a redeploy by for example adding a new label.

Here we have an example Kubernetes deployment of nginx:

``` 
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

We can then force a redeploy by patching in a new label inside the spec->template->medata->labels.

```
$ kubectl patch deployment your_deployment -p "{\"spec\": {\"template\": {\"metadata\": { \"labels\": {  \"redeploy\": \"$(date +%s)\"}}}}}"
```

And now you should see a new ReplicaSet trying to deploy new pods for you! 