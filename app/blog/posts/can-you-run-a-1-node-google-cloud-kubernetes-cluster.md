# Can you run a 1-node Google Cloud Kubernetes Cluster?

I use Kubernetes for work and helps other uses Kubernetes, but my recommendation for people making sideprojects is to not use Kubernetes, it has a lot of overhead compared to if the focus on sideprojects is that it should run cheaply.

But what is the least expensive Google Cloud Kubernetes cluster you can run?

So looking at it Google Cloud has one instance type that is 1.7 GB memory and 0.5 vCPU, knowing Kubernetes I know it would use quite some memory for core services, but you nice thing with GKE is you don't pay for the Kubernetes Master nodes.

So creating the GKE cluster and looking at the node with `describe`

```
$ kubectl describe nodes
```

This will show all information about the node, the interesting part is this part. Every pod in Kubernetes can both have a request and a limit. Request is what you will expect the base usage of the app and the limit describe when to kill the application becauses it uses too much capacity.

Looking at the table we can see we are already overcommitted on both memory and cpu, not so good. We can still schedule some pods, but we can experience failures for overselling the server.

```
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  CPU Requests  CPU Limits    Memory Requests  Memory Limits
  ------------  ----------    ---------------  -------------
  681m (72%)    1296m (137%)  807312Ki (67%)   1421712Ki (119%)
```

Creating a new node in the cluster, so we now have 2 nodes, has much fewer `kube-system` pods running, only two, fluentd for shipping logs, kube-proxy for networking in the cluster and the i7-default load-balancing backend.

And your second node will look like this, 20% requested cpu and 8% memory, so you have 80% capacity left for your apps on a node with 1vCPU and 3.5 GB memory.

```
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  CPU Requests  CPU Limits    Memory Requests  Memory Limits
  ------------  ----------    ---------------  -------------
  210m (22%)    1010m (107%)  220Mi (8%)       520Mi (19%)
```

## Summary	

So the conclusion must be that it is not really feasible and Kubernetes are built for bigger scale and even if you could run it on 1 node, you would miss some of the really great features like easy overlay networking and you would not be prevented if any failures happened. So I would still recommend sideprojects to be running on some kind of serverless solution!

https://cloud.google.com/compute/docs/machine-types