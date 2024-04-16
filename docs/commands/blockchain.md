`klayr-core blockchain`
=======================

Commands relating to Klayr Core blockchain data.

* [`klayr-core blockchain:download`](#klayr-core-blockchaindownload)
* [`klayr-core blockchain:export`](#klayr-core-blockchainexport)
* [`klayr-core blockchain:hash`](#klayr-core-blockchainhash)
* [`klayr-core blockchain:import FILEPATH`](#klayr-core-blockchainimport-filepath)
* [`klayr-core blockchain:reset`](#klayr-core-blockchainreset)

## `klayr-core blockchain:download`

Download snapshot from <URL>.

```
USAGE
  $ klayr-core blockchain:download

OPTIONS
  -n, --network=network  [default: mainnet] Default network config to use. Environment variable "KLAYR_NETWORK" can also
                         be used.

  -o, --output=output    Directory path to specify where snapshot is downloaded. By default outputs the files to current
                         working directory.

  -u, --url=url          The url to the snapshot.

EXAMPLES
  download
  download --network betanet
  download --url https://snapshots.klayr.xyz/mainnet/blockchain.db.tar.gz --output ./downloads
```

_See code: [dist/commands/blockchain/download.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3-alpha.0/dist/commands/blockchain/download.ts)_

## `klayr-core blockchain:export`

Export to <FILE>.

```
USAGE
  $ klayr-core blockchain:export

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -o, --output=output        The output directory. Default will set to current working directory.

EXAMPLES
  blockchain:export
  blockchain:export --data-path ./data --output ./my/path/
```

_See code: [dist/commands/blockchain/export.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3-alpha.0/dist/commands/blockchain/export.ts)_

## `klayr-core blockchain:hash`

Generate SHA256 hash from <PATH>.

```
USAGE
  $ klayr-core blockchain:hash

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

EXAMPLES
  blockchain:hash
  blockchain:hash --data-path ./data
```

_See code: [dist/commands/blockchain/hash.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3-alpha.0/dist/commands/blockchain/hash.ts)_

## `klayr-core blockchain:import FILEPATH`

Import from <FILE>.

```
USAGE
  $ klayr-core blockchain:import FILEPATH

ARGUMENTS
  FILEPATH  Path to the gzipped blockchain data.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -f, --force                Delete and overwrite existing blockchain data

EXAMPLES
  blockchain:import ./path/to/blockchain.tar.gz
  blockchain:import ./path/to/blockchain.tar.gz --data-path ./klayr/
  blockchain:import ./path/to/blockchain.tar.gz --data-path ./klayr/ --force
```

_See code: [dist/commands/blockchain/import.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3-alpha.0/dist/commands/blockchain/import.ts)_

## `klayr-core blockchain:reset`

Reset the blockchain data.

```
USAGE
  $ klayr-core blockchain:reset

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -y, --yes                  Skip confirmation prompt.

EXAMPLES
  blockchain:reset
  blockchain:reset --data-path ./klayr
  blockchain:reset --yes
```

_See code: [dist/commands/blockchain/reset.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3-alpha.0/dist/commands/blockchain/reset.ts)_
