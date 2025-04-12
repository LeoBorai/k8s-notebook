# Local Registry

### Enable the  `registry` addon

Enable Minikube's registry:

```sh
minikube addons enable registry
```

### Use `socat` to redirect to Minikube's Registry

Then setup Docker to push images to this registry, redirect port `5000` on the
docker virtual machine over to port `5000` on the minikube machine.

Use Docker’s network configuration to instantiate a container on the docker’s host,
and run socat there:

```sh
docker run \
    --rm \
    -it \
    --network=host \
    alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
```

Given the `-it` parameter the process will attach to the terminal process.

### Push Image to Local registry

With `socat` running, we can push local images to the Minikube's registry.

```sh
docker tag username/image localhost:5000/myimage
docker push localhost:5000/myimage
```

For instance, in the `examples/server` bun project, the image can be build and
pushed to this local repository.

```sh
# Build the Docker image in the current directory
docker build --pull -t local/bun-hello-world .

# Tag the Docker image
docker tag local/bun-hello-world localhost:5000/bun-hello-world

# Push the Docker image to the local registry
docker push localhost:5000/bun-hello-world
```
