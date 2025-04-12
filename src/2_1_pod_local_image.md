# Local Images

Running local Docker images in Minikube requires loading them into
Minikube's Docker.

Read more on ["Pushing directly to the in-cluster Docker Daemon"](https://minikube.sigs.k8s.io/docs/handbook/pushing/#1-pushing-directly-to-the-in-cluster-docker-daemon-docker-env).

### Reuse the Docker daemon from Minikube

Use the `docker-env` output to setup the Docker environment from Minikube
as primary Docker.

```sh
eval $(minikube docker-env)
```

### Load an Image into Minikube

> You must build the image before, run:
> `docker build -t local/bun-hello-world .`

To make an image available for Minikube, the image must be loaded first.

```sh
minikube image load local/bun-hello-world
```

### Create a Pod with Local Image

Create a Pod with the image on Kubernetes could be done by creating
the following `pod.yaml`, then applying it with `kubectl apply -f pod.yaml`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: bun-hello-world
  labels:
    app: bun-hello-world
    tier: backend
spec:
  containers:
    - name: bun-hello-world
      image: local/bun-hello-world
      imagePullPolicy: Never
```

> The `imagePullPolicy` is used to restrict Kubernetes from pulling the
> image from the registry and to instead use the local image.

> Check the Pod is running:
> ```sh
> kubectl get pod
> ```
>
> ```
> NAME              READY   STATUS    RESTARTS   AGE
> bun-hello-world   1/1     Running   0          19s
> ```

### Port-Forward Pod

To access the Pod, you must run the `kubectl port-forward` command.

```sh
kubectl port-forward bun-hello-world 3030:3030
```
