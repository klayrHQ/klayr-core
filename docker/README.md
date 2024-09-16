# Using the klayr/core docker image

klayr/core version 4 does not have any external dependencies and thus does not require using `docker-compose`.

Note: It is also possible to use [podman](https://github.com/containers/podman/) instead of docker by simply replacing the occurrences of docker with podman, in the following examples or alternatively by creating an alias with `alias docker=podman`.

## Run

Run a "klayr-core" container against the mainnet:

```
docker run --volume klayr-data:/home/klayr/.klayr \
           --publish 7667:7667 \
           --name klayr-core \
           klayr/core:4.1.5 \
           start --network=mainnet
```

### Configuration

Further parameters can be passed after `--network`, e.g.:

```
docker run --volume klayr-data:/home/klayr/.klayr \
           --publish 7667:7667 \
           --publish 127.0.0.1:7887:7887 \
           --name klayr-core \
           klayr/core:4.1.5 \
           start --network=mainnet --api-ws --api-http --log=debug
```

Environment variables can be set with `--env`:

```
docker run --volume klayr-data:/home/klayr/.klayr \
           --publish 7667:7667 \
           --env KLAYR_LOG_LEVEL=debug \
           --name klayr-core \
           klayr/core:4.1.5 \
           start --network=mainnet
```

See https://klayr.xyz/documentation/klayr-core/management/configuration.html for a reference of configuration options.

## Import blockchain snapshot

```
docker run --volume klayr-data:/home/klayr/.klayr -it --rm klayr/core:4.1.5 blockchain:download --network=mainnet --output=/home/klayr/.klayr/tmp/

docker run --volume klayr-data:/home/klayr/.klayr -it --rm klayr/core:4.1.5 blockchain:import /home/klayr/.klayr/tmp/blockchain.db.tar.gz

docker run --volume klayr-data:/home/klayr/.klayr -it --rm --entrypoint rm klayr/core:4.1.5 -f /home/klayr/.klayr/tmp/blockchain.db.tar.gz

docker start klayr-core

docker logs -f klayr-core
```
