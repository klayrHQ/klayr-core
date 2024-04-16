`klayr-core genesis-block`
==========================

Creates genesis block file.

* [`klayr-core genesis-block:create`](#klayr-core-genesis-blockcreate)
* [`klayr-core genesis-block:download`](#klayr-core-genesis-blockdownload)

## `klayr-core genesis-block:create`

Creates genesis block file.

```
USAGE
  $ klayr-core genesis-block:create

OPTIONS
  -c, --config=config                        File path to a custom config. Environment variable "KLAYR_CONFIG_FILE" can
                                             also be used.

  -f, --assets-file=assets-file              (required) Path to file which contains genesis block asset in JSON format

  -h, --height=height                        Genesis block height

  -n, --network=network                      [default: default] Default network config to use. Environment variable
                                             "KLAYR_NETWORK" can also be used.

  -o, --output=output                        [default: config] Output folder path of the generated genesis block

  -p, --previous-block-id=previous-block-id  Previous block id

  -t, --timestamp=timestamp                  Timestamp

  --export-json                              Export genesis block as JSON format along with blob

EXAMPLES
  genesis-block:create --output mydir
  genesis-block:create --output mydir --assets-file ./assets.json
  genesis-block:create --output mydir --assets-file ./assets.json --height 2 --timestamp 1592924699 --previous-block-id 
  085d7c9b7bddc8052be9eefe185f407682a495f1b4498677df1480026b74f2e9
```

_See code: [dist/commands/genesis-block/create.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3/dist/commands/genesis-block/create.ts)_

## `klayr-core genesis-block:download`

Download genesis block.

```
USAGE
  $ klayr-core genesis-block:download

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -f, --force                Delete and overwrite existing genesis block.

  -n, --network=network      Default network config to use. Environment variable "KLAYR_NETWORK" can also be used.

  -u, --url=url              The url to download the genesis block from.

EXAMPLES
  genesis-block:download --network mainnet -f
  genesis-block:download --network --data-path ./klayr/
  genesis-block:download --url http://mydomain.com/genesis_block.blob.tar.gz --data-path ./lisk/ --force
```

_See code: [dist/commands/genesis-block/download.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3/dist/commands/genesis-block/download.ts)_
