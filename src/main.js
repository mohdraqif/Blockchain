// Implementation of a BLOCKCHAIN
const { Transaction, Blockchain } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('fc16c99e18e8a5c787a22239eef50d9d46315f69883485ae28b530aeaedb0bbb')
const myWalletAddress = myKey.getPublic('hex')
const blockChain = new Blockchain()

// Transactions of the blockchain

const tx1 = new Transaction(myWalletAddress, 'address2', 10)
tx1.signTransaction(myKey)
blockChain.addTransaction(tx1)

const tx2 = new Transaction(myWalletAddress, 'address1', 15)
tx2.signTransaction(myKey)
blockChain.addTransaction(tx2)

const tx3 = new Transaction(myWalletAddress, 'address1', 5)
tx3.signTransaction(myKey)
blockChain.addTransaction(tx3)

const tx4 = new Transaction(myWalletAddress, 'address1', 5)
tx4.signTransaction(myKey)
blockChain.addTransaction(tx4)


// Mining the transactions of the blocks

console.log('Mining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('Mining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('Mining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('Mining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)


// Formatting the blockchain

console.log(JSON.stringify(blockChain, null, 4))

console.log(`\nBalance of witcher5671 is $ ${blockChain.getBalanceOfAddress(myWalletAddress)}`);

console.log('Is the blockchain valid? ' + blockChain.isChainValid())