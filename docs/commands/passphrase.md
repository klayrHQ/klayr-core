`klayr-core passphrase`
=======================

Commands relating to Klayr Core passphrases.

* [`klayr-core passphrase:create`](#klayr-core-passphrasecreate)
* [`klayr-core passphrase:decrypt`](#klayr-core-passphrasedecrypt)
* [`klayr-core passphrase:encrypt`](#klayr-core-passphraseencrypt)

## `klayr-core passphrase:create`

Returns a randomly generated 24 words mnemonic passphrase.

```
USAGE
  $ klayr-core passphrase:create

OPTIONS
  -o, --output=output  The output directory. Default will set to current working directory.

EXAMPLES
  passphrase:create
  passphrase:create --output /mypath/passphrase.json
```

_See code: [dist/commands/passphrase/create.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3/dist/commands/passphrase/create.ts)_

## `klayr-core passphrase:decrypt`

Decrypt secret passphrase using the password provided at the time of encryption.

```
USAGE
  $ klayr-core passphrase:decrypt

OPTIONS
  -f, --file-path=file-path  (required) Path of the file to import from

  -w, --password=password    Specifies a source for your secret password. Command will prompt you for input if this
                             option is not set.
                             Examples:
                             - --password=pass:password123 (should only be used where security is not important)

EXAMPLES
  passphrase:decrypt --file-path ./my/path/output.json
  passphrase:decrypt --file-path ./my/path/output.json --password your-password
```

_See code: [dist/commands/passphrase/decrypt.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3/dist/commands/passphrase/decrypt.ts)_

## `klayr-core passphrase:encrypt`

Encrypt secret passphrase using password.

```
USAGE
  $ klayr-core passphrase:encrypt

OPTIONS
  -o, --output=output          The output directory. Default will set to current working directory.

  -p, --passphrase=passphrase  Specifies a source for your secret passphrase. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --passphrase='my secret passphrase' (should only be used where security is not
                               important)

  -w, --password=password      Specifies a source for your secret password. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --password=pass:password123 (should only be used where security is not important)

  --output-public-key          Includes the public key in the output. This option is provided for the convenience of
                               node operators.

EXAMPLES
  passphrase:encrypt
  passphrase:encrypt --passphrase your-passphrase --output /mypath/keys.json
  passphrase:encrypt --password your-password
  passphrase:encrypt --password your-password --passphrase your-passphrase --output /mypath/keys.json
  passphrase:encrypt --output-public-key --output /mypath/keys.json
```

_See code: [dist/commands/passphrase/encrypt.ts](https://github.com/klayrhq/klayr-core/blob/v4.0.3/dist/commands/passphrase/encrypt.ts)_
