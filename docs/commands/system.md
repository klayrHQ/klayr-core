`klayr-core system`
===================

Commands relating to Klayr Core node.

* [`klayr-core system:metadata`](#klayr-core-systemmetadata)
* [`klayr-core system:node-info`](#klayr-core-systemnode-info)

## `klayr-core system:metadata`

Get node metadata from a running application.

```
USAGE
  $ klayr-core system:metadata

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  system:metadata
  system:metadata --data-path ./klayr
```

_See code: [dist/commands/system/metadata.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.6/dist/commands/system/metadata.ts)_

## `klayr-core system:node-info`

Get node information from a running application.

```
USAGE
  $ klayr-core system:node-info

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  system:node-info
  system:node-info --data-path ./klayr
```

_See code: [dist/commands/system/node-info.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.6/dist/commands/system/node-info.ts)_
