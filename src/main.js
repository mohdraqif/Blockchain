// Implementation of a BLOCKCHAIN
const { Transaction, Blockchain } = require('./blockchain')
var readlineSync = require('readline-sync');
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

console.log('Miner started!')
console.log('\nMining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('\nMining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('\nMining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)

console.log('\nMining block. Please wait.....')
blockChain.minePendingTransations(myWalletAddress)


// Formatting the blockchain access

const PASSWORD = 'raqif@12345'

if(readlineSync.keyInYN('\nDo you want to see the chain?')) {

    const password1 = readlineSync.question('\nEnter your password of chain: ', {
        hideEchoBack: true
    })
    if(password1 === PASSWORD) {
        const password2 = readlineSync.question('\nConfirm your password again: ', {
            hideEchoBack: true
        })

        if(password1 === password2) {
            console.log('\nWelcome Mohd!')
            
            setInterval(() => {
                console.log(JSON.stringify(blockChain, null, 4))   
                console.log(`\nBalance of witcher5671 is $ ${blockChain.getBalanceOfAddress(myWalletAddress)}`)
            }, 2000);
        } else {
            console.log('Hmmm! Passwords do not match.Try again')
        }
        
    } else {
        console.log('Sorry! Wrong password.')
    }
} else {
    console.log('\nYou chose to hide the chain. Nice decision!')
}