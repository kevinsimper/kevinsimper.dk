# Kubernetes Introduction

### Checking the status of the cluster

```
$ kubectl cluster-info
$ kubectl version
```

### kubectl run
```
$ kubectl run —-image=nginx webserver
```

### Port Forward
```
$ kubectl get pods
$ kubectl portforward POD 5000:80
```

### Expose

```
$ kubectl expose deploy/kubernetes-node --type=NodePort
$ kubectl get services
```

### Apply

```
$ kubectl apply -f deployment.yaml
```

## Code used in the video

https://github.com/kevinsimper/kubernetes-node-example
