// Implementation of a BLOCKCHAIN
const { Transaction, Blockchain } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('fc16c99e18e8a5c787a22239eef50d9d46315f69883485ae28b530aeaedb0bbb')
const myWalletAddress = myKey.getPublic('hex')


const blockChain = new Blockchain()

const tx1 = new Transaction(myWalletAddress, 'address2', 10)
tx1.signTransaction(myKey)
blockChain.addTransaction(tx1)

// console.log(JSON.stringify(blockChain, null, 4))

console.log('Mining block...')
blockChain.minePendingTransations(myWalletAddress)


const tx2 = new Transaction(myWalletAddress, 'address1', 20)
tx2.signTransaction(myKey)
blockChain.addTransaction(tx2)

console.log('Mining block...')
blockChain.minePendingTransations(myWalletAddress)


console.log(`Balance of witcher5671 is ${blockChain.getBalanceOfAddress(myWalletAddress)}`);
// blockChain.chain[1].data = { amount: 100 }
// blockChain.chain[1].hash = blockChain.chain[1].calculateHash()
// console.log('Is the blockchain valid? ' + blockChain.isChainValid())