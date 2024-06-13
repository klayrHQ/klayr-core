`klayr-core config`
===================

Commands relating to Klayr Core node configuration.

* [`klayr-core config:create`](#klayr-core-configcreate)
* [`klayr-core config:show`](#klayr-core-configshow)

## `klayr-core config:create`

Creates network configuration file.

```
USAGE
  $ klayr-core config:create

OPTIONS
  -i, --chain-id=chain-id  (required) ChainID in hex format. For example, Klayr mainnet mainchain is 00000000
  -l, --label=label        [default: beta-sdk-app] App Label

  -o, --output=output      [default: /Users/corbifex/Developer/klayr-hq/temp/klayr-core] Directory where the config file
                           is saved

EXAMPLES
  config:create --output mydir
  config:create --output mydir --label beta-sdk-app
  config:create --output mydir --label beta-sdk-app --community-identifier sdk
```

_See code: [dist/commands/config/create.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.1/dist/commands/config/create.ts)_

## `klayr-core config:show`

Show application config.

```
USAGE
  $ klayr-core config:show

OPTIONS
  -c, --config=config        File path to a custom config. Environment variable "KLAYR_CONFIG_FILE" can also be used.

  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  config:show
  config:show --pretty
  config:show --config ./custom-config.json --data-path ./data
```

_See code: [dist/commands/config/show.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.1/dist/commands/config/show.ts)_
