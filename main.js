// Implementation of a BLOCKCHAIN
const SHA256 = require("crypto-js/sha256")

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block {
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp
        this.transaction = transaction
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log('Block mined: ' + this.hash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()]
        this.pendingTransactions = []
        this.difficulty = 5
        this.miningReward = 100
    }

    generateGenesisBlock() {
        return new Block('05-02-2020', 'Genesis Block', 'NULL')
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1]
    }

    minePendingTransations(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)

        console.log('Block successfully mined!')
        this.chain.push(block)

        this.pendingTransactions = [ 
            new Transaction(null, miningRewardAddress, this.miningReward)
         ]
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address) {
        let balance = 0

        for(const block of this.chain) {
            for(const trans of block.transaction) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if(trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
        }
        return true
    }
}

let blockChain = new Blockchain

// console.log('Mining block 1... ')
// blockChain.addBlock(new Block('1', '06-02-2020', { amount: 10 }))

// console.log('Mining block 2... ')
// blockChain.addBlock(new Block('2', '06-02-2020', { amount: 12 }))

// console.log('Mining block 3... ')
// blockChain.addBlock(new Block('3', '07-02-2020', { amount: 15 }))

console.log(JSON.stringify(blockChain, null, 4))
blockChain.createTransaction(new Transaction('address1', 'address2', 100))

console.log('Mining block...')
blockChain.minePendingTransations('witcher5671')

console.log('Mining block...')
blockChain.minePendingTransations('witcher5671')

console.log('Mining block...')
blockChain.minePendingTransations('witcher5671')


console.log('\nBalance of witcher5671 is ' + blockChain.getBalanceOfAddress('witcher5671'))
// blockChain.chain[1].data = { amount: 100 }
// blockChain.chain[1].hash = blockChain.chain[1].calculateHash()
// console.log('Is the blockchain valid? ' + blockChain.isChainValid())