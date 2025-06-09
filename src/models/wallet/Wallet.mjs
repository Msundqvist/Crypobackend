import { INITIAL_BALANCE } from "../../utilities/config.mjs";
import { keyMgr } from "../../utilities/keyManager.mjs";
import { generateHash } from "../../utilities/hash.mjs";
import Transaction from "./Transaction.mjs";

export default class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = keyMgr.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    static calculateBalance({ chain, address }) {
        let total = 0;
        hasMadeAtransaction = false;

        for (let i = chain.length - 1; i > 0; i--) {
            const block = chain[i]

            for (let transaction of block.data) {
                if (transaction.input.address === address) {
                    hasMadeAtransaction = true;
                }

                const amount = transaction.outputMap[address];

                if (amount) total += amount;

            }
            if (hasMadeAtransaction) break;
        }
        return hasMadeAtransaction ? total : INITIAL_BALANCE + total;
    }

    createTransaction({ recipient, amount, chain }) {
        if (chain) {
            this.balance = Wallet.calculateBalance({ chain, address: this.publicKey })
        };

        if (amount > this.balance) throw new Error('Not enougn founds!')
        return new Transaction({ sender: this, recipient, amount })
    }

    sign(data) {
        return this.keyPair.sign(generateHash(data))
    }
}