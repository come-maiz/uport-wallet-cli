#!/usr/bin/env node

const qrcode = require('qrcode-terminal')
const Connect = require('uport-connect').Connect
const program = require('commander')

const tokenABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

let uriHandler = uri => qrcode.generate(uri, {small: false})

let uport = new Connect('term-dapp', {uriHandler})

let web3 = uport.getWeb3()

let Token = web3.eth.contract(tokenABI)

function getBalance(options) {
  web3.eth.getCoinbase((error, address) => {
    console.log('Your rinkeby address', address)
    if (options.parent.token) {
      tokenBalance(address)
    } else {
      etherBalance(address)
    }
  })

  function etherBalance(address) {
    web3.eth.getBalance(address, (error, balance) => {
      let numEth = web3.fromWei(balance.toNumber(), 'ether')
      console.log('Balance:', numEth, 'ETH')
    })
  }

  function tokenBalance(address) {
    let token = Token.at(options.parent.token)
    token.balanceOf(address, (error, balance) => {
      console.log('Balance:', balance.toString())
    })
  }
}

function send(address, numToSend, options) {
  if (!address || !numToSend) {
    console.log('Please provide address and amount')
    return
  }
  if (options.parent.token) {
    sendToken()
  } else {
    sendEther()
  }

  function sendEther() {
    web3.eth.sendTransaction({to: address, value: web3.toWei(numToSend, 'ether')}, (error, txHash) =>{
      console.log('TxHash:', txHash)
    })
  }

  function sendToken() {
    let token = Token.at(options.parent.token)
    token.transfer(address, numToSend, (error, txHash) => {
      console.log('TxHash:', txHash)
    })
  }
}

console.log("--- WARNING: this tool is currently only running on the rinkeby testnet ---")

program
  .command('balance')
  .description('Get the balance of the specified token (default ether)')
  .action(getBalance)

program
  .command('send [address] [number]')
  .description('Send the specified number of tokens (default ether)')
  .action(send)

program
  .version('0.0.1')
  .option('-t --token <token-address>', 'Which token to use')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}
