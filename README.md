![Logo](./docs/assets/banner_core.png)

# Klayr Core

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/klayrhq/klayr-core)
![GitHub repo size](https://img.shields.io/github/repo-size/klayrhq/klayr-core)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8870/branches/113510/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&tid=6759&pid=8870&bid=113510)
![GitHub issues](https://img.shields.io/github/issues-raw/klayrhq/klayr-core)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/klayrhq/klayr-core)
[![Code coverage](https://codecov.io/gh/klayrhq/klayr-core/branch/development/graph/badge.svg?token=U0CU1XQZ52)](https://codecov.io/gh/klayrhq/klayr-core)

Klayr is a next-generation crypto-currency and decentralized application platform, written entirely in TypeScript forked from the [Lisk](https://lisk.com) application platform. The official documentation about the entire ecosystem can be found at https://docs.klayr.xyz/.

[Klayr Core](https://klayr.xyz/documentation/klayr-core/index.html) is the program that implements the [Klayr Protocol](https://klayr.xyz/documentation/introduction.html#the-klayr-protocol). In other words, Klayr Core is what every machine needs to set-up to run a node that allows for participation in the network.

This document details how to install Klayr Core from source and from npm registry, but there are two other ways to participate in the network: [binaries](https://klayr.xyz/documentation/klayr-core/setup/binary.html) and [Docker images](https://klayr.xyz/documentation/klayr-core/setup/docker.html).
If you have satisfied the requirements from the Pre-Installation section, you can jump directly to the next section [Installation Steps](#installation).

## Index

- [Installation](#installation)
- [Managing Klayr Node](#managing-klayr-node)
- [Configuring Klayr Node](#configuring-klayr-node)
- [Tests](#tests)
- [License](#license)

## Installation

### Dependencies

The following dependencies need to be installed in order to run applications created with the Klayr SDK:

| Dependencies | Version |
| ------------ | ------- |
| NodeJS       | 18.19.1 |

You can find further details on installing these dependencies in our [pre-installation setup guide](https://klayr.xyz/documentation/klayr-core/setup/source.html#source-pre-install).
Clone the Klayr Core repository using Git and initialize the modules.

### From Source

```bash
git clone https://github.com/klayrhq/klayr-core.git
cd klayr-core
git checkout main
nvm install
npm i -g yarn
yarn install --frozen-lockfile
npm run build
./bin/run --help
```

### From NPM

<!-- usage -->

```sh-session
$ npm install -g klayr-core
$ klayr-core COMMAND
running command...
$ klayr-core (-v|--version|version)
klayr-core/4.1.1 darwin-x64 node-v18.20.2
$ klayr-core --help [COMMAND]
USAGE
  $ klayr-core COMMAND
...
```

<!-- usagestop -->

<!-- commands -->

# Command Topics

- [`klayr-core autocomplete`](docs/commands/autocomplete.md) - display autocomplete installation instructions
- [`klayr-core help`](docs/commands/help.md) - Display help for klayr-core.
- [`klayr-core sdk`](docs/commands/sdk.md) - Commands relating to Klayr SDK development.
- [`klayr-core version`](docs/commands/version.md)

<!-- commandsstop -->

## Managing Klayr Node

### System requirements

The following system requirements are recommended for validator nodes:

#### Memory

- Machines with a minimum of 8 GB RAM for the Mainnet.
- Machines with a minimum of 8 GB RAM for the Testnet.

#### Storage

- Machines with a minimum of 40 GB HDD.

#### OS

- Ubuntu 22
- Ubuntu 20
- MacOS 13

To start a Klayr Core node as a background process, we recommend using a process management tool, such as [PM2](https://pm2.keymetrics.io/).

### Example using PM2

```
nvm install
npm i -g pm2
pm2 start "klayr-core start" --name klayr-mainnet
pm2 status
pm2 logs klayr-mainnet
```

For a more advanced options refer to [PM2 documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

## Configuring Klayr Node

[`klayr-core start`](docs/commands/start.md) supports flag and environment variable options to configure a node.

In addition, custom configuration through the JSON file can be made available through the `--config, -c` flag.

> **NOTE**: As a security measure, access to all the methods on the node over the IPC and HTTP API by default are disabled. To allow access, the `rpc.allowedMethods` property within the custom node config file may be configured as shown below.
>
> - `rpc.allowedMethods: ["system_getNodeInfo"]` - Expose specific methods
> - `rpc.allowedMethods: ["system", "token"]` - Expose all the registered methods under the specified namespaces
> - `rpc.allowedMethods: ["*"]` - Expose all available registered methods under all the namespaces

### Example

With custom config file `./custom-config.json` below:

```
{
  "system": {
    "dataPath": "~/.klayr",
    "logLevel": "debug",
    "keepEventsForHeights": -1
  },
  "rpc": {
    "modes": ["ipc"],
    "port": 7887,
    "host": "127.0.0.1",
    "allowedMethods": ["*"]
  },
  "generator": {
    "keys": {
      "fromFile": "./config/dev-validators.json"
    }
  },
  "network": {
    "port": 7667,
  },
  "transactionPool": {
    "maxTransactions": 8096,
    "maxTransactionsPerAccount": 1024,
  },
  "plugins": {
    "reportMisbehavior": {
      "encryptedPrivateKey": "kdf=argon2id&cipher=aes-256-gcm&version=1&ciphertext=fb564e463ce46efab010f21b06d01acc62f705049563b58628d4ca23053ba6bdce5be39cb5c0624bd75735ee10a8a12b9c7876d86fc3646d036b414701dc6b01217102480cd327f5eec31b2cf209ea8b6c64505ab8bab81ed315c12c33feaaef982facec63c876def26eeefd1c0d9a5b7dce5e604622c704106a64c27b71eff7&mac=429c65daf7f6e9dba5e105be55fb7a450c74e424ff9a20cd5cb614c31fb8b010&salt=19a15ea6d5925d7104b4db0c8b0ca73a&iv=b5ec03e61586b202a1f4e9aa&tag=82ca4b682f89daa642a13edae085feea&iterations=1&parallelism=4&memorySize=2024"
    },
    "chainConnector": {
      "receivingChainIPCPath": "~/.klayr/sidechain",
      "ccuFee": "5000000",
      "encryptedPrivateKey": "kdf=argon2id&cipher=aes-256-gcm&version=1&ciphertext=f962147c16450604456db731156a31b5fa07bc1a55c32f243f59795414b75fbfcbe13a54426976c98fe21c0a9d918b80fb956d280ceff8a7ca35db29eb77ecfd0afbd359233a863425766815c84d5d20ba17ca0edd07e0eacaa3324e53ade573f7f647097dffaf64368cf40be05636bee58318389843d1f29b587d58c71e34ab&mac=bbe4120b758ba7c541cfb39d1ea9b6a781054cdaffbd4b5e724d375fc5367543&salt=20fdfa08a8e6d158fc1f8b70672f43aa&iv=22cb20bdf0a9f06124a7b53a&tag=37cbecb09493581e476dd4439e8ef1fc&iterations=1&parallelism=4&memorySize=2024",
      "password": "lisk"
    }
  },
}
```

Running a command will overwrite the default config and use the specified options.

```bash
klayr-core start -n devnet -c ./custom-config.json --overwrite-config
```

For a more detailed understanding of configuration read this [online documentation](https://klayr.xyz/documentation/klayr-core/management/configuration.html).

## Tests

### Automated tests

All automated tests will run with the below command.

```
npm test
```

### Running a local development node

In order to run a node for a local test, in a root folder of klayr-core, run below command.

```
./bin/run start -n devnet --data-path ./devnet-data --port 3333 --api-ipc --enable-forger-plugin
```

This command will start a klayr-core node using data path `./devnet-data` with Forger Plugins.
Data on the node can be obtained by commands like

```
./bin/run endpoint invoke system_getNodeInfo --pretty
./bin/run system node-info --data-path ./devnet-data
./bin/run block:get 3 --data-path ./devnet-data
```

## Contributors

https://github.com/klayrhq/klayr-core/graphs/contributors

## License

Copyright 2024 Klayr Holding BV.
Copyright 2016-2024 Lisk Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[klayr documentation site]: https://klayr.xyz/documentation/klayr-core/
