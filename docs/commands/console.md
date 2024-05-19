`klayr-core console`
====================

Klayr interactive REPL session to run commands.

* [`klayr-core console`](#klayr-core-console)

## `klayr-core console`

Klayr interactive REPL session to run commands.

```
USAGE
  $ klayr-core console

OPTIONS
  --api-ipc=api-ipc  Enable api-client with IPC communication.
  --api-ws=api-ws    Enable api-client with Websocket communication.

EXAMPLES
  console
  console --api-ws=ws://localhost:8080
  console --api-ipc=/path/to/server
```

_See code: [dist/commands/console.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.0/dist/commands/console.ts)_
