# How to use Prometheus with Kubernetes on Docker for Mac

Prometheus is a tool for monitoring. It works by fetching information from
user-defined servers that provides a certain endpoint for stats. The data is
stored in a time series database and can easily be queried by a visualization
tool like grafana.

<img src="https://i.imgur.com/cMfj4Cb.png"/>

A service that provides an endpoint does it in a Prometheus specific way. Say
you want to count "pageviews". You create a counter and you call for every
pageview, then whenever Prometheus scapes your endpoint, the counter resets.
This way only have to fetch a single number, but it knows the time since last
crawl and can therefore divide it.

Say the counter says 1000 pageviews and Prometheus knows it was 10 seconds ago
it last crawled the endpoint, it can then show that you have 100 pageviews / per
second.

Simple, efficient and smart!

And Kubernetes has a built in way to automatically query the Kubernetes API server
which lets you get started even quicker and with less manual work!

## Running Prometheus

First, we need to run Prometheus just to get started and see we can get it
working.

We can find Prometheus on Docker hub which makes it easy for us to get started.

<img src="https://i.imgur.com/nzJI0ZZ.png"/>

https://hub.docker.com/r/prom/prometheus/

Then we can create a folder and create our first prometheus config file called
`prometheus.yaml`:

```
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>`
  # to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets
    # from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
```

and then run it first with docker locally to test it:

```
docker run -it -p 9090:9090 -v $PWD/prometheus.yaml:/etc/prometheus.yaml \
  prom/prometheus --config.file=/etc/prometheus.yaml
```

To test it open it up in you browser and navigate to localhost:9090.

You will se a simple interface and try to run your first query.

Try typing in:

```
prometheus_target_interval_length_seconds
```

## Running in Kubernetes for Mac

Now we need a config for Kubernetes, and we are going to use this documentation to
write it.

Append a new job that will query all the kubernetes nodes:

```
- job_name: 'kubernetes-nodes'

  scheme: https

  tls_config:
    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    insecure_skip_verify: true
  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

  kubernetes_sd_configs:
  - role: node
```

And your file will looks like this:

```
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>`
  # to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets
    # from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'kubernetes-nodes'

    kubernetes_sd_configs:
    - role: node
```

First we create a namespace where we can store all the config and deployments:

```
kubectl create namespace monitoring
```

We need to create a service account that will be injected in a namespace:

```
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: prometheus
rules:
- apiGroups: [""]
  resources:
  - nodes
  - nodes/proxy
  - services
  - endpoints
  - pods
  verbs: ["get", "list", "watch"]
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs: ["get", "list", "watch"]
- nonResourceURLs: ["/metrics"]
  verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: prometheus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: prometheus
subjects:
- kind: ServiceAccount
  name: default
  namespace: monitoring
```

and we can convert that into a configMap in Kubernetes:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-server-conf
  labels:
    name: prometheus-server-conf
  namespace: monitoring
data:
  prometheus.yml: |-
    global:
      scrape_interval: 5s # By default, scrape targets every 15 seconds.

      # Attach these labels to any time series or alerts when communicating with
      # external systems (federation, remote storage, Alertmanager).
      external_labels:
        monitor: 'codelab-monitor'

    # A scrape configuration containing exactly one endpoint to scrape:
    # Here it's Prometheus itself.
    scrape_configs:
      # The job name is added as a label `job=<job_name>`
      # to any timeseries scraped from this config.
      - job_name: 'prometheus'

        # Override the global default and scrape targets
        # from this job every 5 seconds.
        scrape_interval: 5s

        static_configs:
          - targets: ['localhost:9090']
      - job_name: 'kubernetes-nodes'

        scheme: https

        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
        - role: node
```

and to deploy it we need a `deployment.yaml`

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: prometheus-deployment
  namespace: monitoring
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: prometheus-server
    spec:
      containers:
        - name: prometheus
          image: prom/prometheus:v2.4.3
          args:
            - "--config.file=/etc/prometheus/prometheus.yml"
            - "--storage.tsdb.path=/prometheus/"
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config-volume
              mountPath: /etc/prometheus/
            - name: prometheus-storage-volume
              mountPath: /prometheus/
      volumes:
        - name: prometheus-config-volume
          configMap:
            defaultMode: 420
            name: prometheus-server-conf
        - name: prometheus-storage-volume
          emptyDir: {}
```

Now you can port forward to the prometheus container with and see it in the browser:

```
$ kubectl port-forward deploy/prometheus-deployment 9090 --namespace=monitoring
```

Now you can visit the prometheus site on localhost:9090 again.

Now type in:

```
kubelet_running_container_count
```

And you will get how many containers are running per node.

<img src="https://i.imgur.com/LH0gXpX.png" />

Congrats, you now have Prometheus running on Docker for Mac and you can now try even more!
