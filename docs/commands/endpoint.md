`klayr-core endpoint`
=====================

Invokes the provided endpoint.

* [`klayr-core endpoint:invoke ENDPOINT [PARAMS]`](#klayr-core-endpointinvoke-endpoint-params)
* [`klayr-core endpoint:list [ENDPOINT]`](#klayr-core-endpointlist-endpoint)

## `klayr-core endpoint:invoke ENDPOINT [PARAMS]`

Invokes the provided endpoint.

```
USAGE
  $ klayr-core endpoint:invoke ENDPOINT [PARAMS]

ARGUMENTS
  ENDPOINT  Endpoint to invoke
  PARAMS    Endpoint parameters (Optional)

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -f, --file=file            Input file.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  endpoint:invoke {endpoint} {parameters}
  endpoint:invoke --data-path --file
  endpoint:invoke generator_getAllKeys
  endpoint:invoke consensus_getBFTParameters '{"height": 2}' -d ~/.klayr/pos-mainchain --pretty
  endpoint:invoke consensus_getBFTParameters -f ./input.json
```

_See code: [dist/commands/endpoint/invoke.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.4-alpha.3/dist/commands/endpoint/invoke.ts)_

## `klayr-core endpoint:list [ENDPOINT]`

Lists registered endpoints.

```
USAGE
  $ klayr-core endpoint:list [ENDPOINT]

ARGUMENTS
  ENDPOINT  Endpoint name (Optional)

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "KLAYR_DATA_PATH"
                             can also be used.

  -i, --info                 Prints additional info; Request and Response objects.

  -m, --module=module        Parent module.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  endpoint:list
  endpoint:list {endpoint} -m {module}
  endpoint:list {endpoint} -m {module} -i
  endpoint:list -m validator
  endopint:list getBalance
  endpoint:list get -m token 
  endpoint:list getBalances -m token -i --pretty
  endpoint:list getBalances -m token -d ~/.klayr/pos-mainchain
```

_See code: [dist/commands/endpoint/list.ts](https://github.com/klayrhq/klayr-core/blob/v4.1.4-alpha.3/dist/commands/endpoint/list.ts)_
