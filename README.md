# uport wallet cli

This is a simple ether and ERC20 wallet for uport implemented in cli.

## Install

### With npm

```bash
$ npm i -g uport-wallet-cli
```

### With snap

In any of the [supported Linux distros](https://snapcraft.io/docs/core/install):

```bash
sudo snap install uport-wallet-cli --edge --devmode
```

(Note that this is an experimental and unstable release, at the moment)

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
