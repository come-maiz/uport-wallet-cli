const qrcode = require('qrcode-terminal')
const Connect = require('uport-connect').Connect
const program = require('commander')

var uriHandler = uri => qrcode.generate(uri, {small: false})

var uport = new Connect('term-dapp', {uriHandler})

var web3 = uport.getWeb3()


function getBalance(options) {
  if (options.parent.token) {
    throw new Error('Tokens not supported yet')
  }
  web3.eth.getCoinbase((error, address) => {
    console.log('Your rinkeby address', address)

    web3.eth.getBalance(address, (error, balance) => {
      let numEth = web3.fromWei(balance.toNumber(), 'ether')
      console.log('Balance:', numEth, 'ETH')
    })
  })
}

function send(address, numToSend, options) {
  if (options.parent.token) {
    throw new Error('Tokens not supported yet')
  }
  console.log(address, numToSend)
  web3.eth.sendTransaction({to: address, value: web3.toWei(numToSend, 'ether')}, (error, txHash) =>{
    console.log('TxHash:', txHash)
  })

}

function wrap(cmd, options, action) {
}

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
  .option('-t --token <TOKEN>', 'Which token to use')
  .parse(process.argv)
