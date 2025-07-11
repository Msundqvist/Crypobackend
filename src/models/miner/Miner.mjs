import Transaction from "../wallet/Transaction.mjs";
import blockchainModel from "../schemas/blockchainModel.mjs";
export default class Miner {
    constructor({ transactionPool, wallet, blockchain, server }) {
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.blockchain = blockchain;
        this.server = server;

    }
    mineTransactions() {
        let validTransactions = [];

        validTransactions = this.transactionPool.validateTransactions();

        validTransactions.push(
            Transaction.transactionReward({ miner: this.wallet })
        );

        this.blockchain.addBlock({ data: validTransactions });
        blockchainModel.create({ blockchain: this.blockchain.chain })
        this.server.broadcastChain();

        this.transactionPool.clearTransactions();
    }
}