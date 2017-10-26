# uport wallet cli

This is a simple ether and ERC20 wallet for uport implemented in cli.

## Install
```bash
$ npm i -g uport-wallet-cli
```

## Usage
```bash
$ uport-wallet-cli -h
```

```
  Usage: index [options] [command]


  Options:

    -V, --version               output the version number
    -t --token <token-address>  Which token to use
    -h, --help                  output usage information


  Commands:

    balance                  Get the balance of the specified token (default ether)
    send [address] [number]  Send the specified number of tokens (default ether)
```
