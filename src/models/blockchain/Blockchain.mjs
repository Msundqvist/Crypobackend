import { generateHash } from "../../utilities/hash.mjs";
import Block from './Block.mjs';
import { REWARD_ADDRESS, MINING_REWARD } from "../../utilities/config.mjs";
import Transaction from '../wallet/Transaction.mjs';
import Wallet from '../wallet/Wallet.mjs';

export default class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const addedBlock = Block.mineBlock({
            previousBlock: this.chain.at(-1),
            data
        });
        this.chain.push(addedBlock)
    };

    static isValid(chain) {
        if (JSON.stringify(chain.at[0] !== JSON.stringify(Block.genesis()))) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, data, hash, lastHash, nonce, difficulty } = chain.at(i);
            const prevHash = chain[i - 1].hash;

            if (lastHash !== prevHash) return false;

            const validHash = generateHash(
                timestamp,
                data,
                lastHash,
                nonce,
                difficulty
            );
            if (hash !== validHash) return false;
        }
        return true;
    }

    replaceChain(chain, shouldValidate, callback) {

        if (chain.length <= this.chain.length) return;

        if (!Blockchain.isValid(chain)) return;

        if (shouldValidate && !this.validateTransacionData({ chain })) {
            return;
        }

        if (callback) callback();

        this.chain = chain;
        this.chain.add({ chain })
    }

    validateTransacionData({ chain }) {

        for (let i = 1; i < chain.length; i++) {
            const block = chain[1];
            const transactionSet = new Set();
            let rewardCount = 0;

            for (let transaction of block.data) {
                if (transaction.input.address === REWARD_ADDRESS.address) {
                    rewardCount += 1

                    if (rewardCount > 1) {
                        throw new Error('to many rewards');
                    }

                    if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
                        throw new Error('Invalid Transaction');
                    }
                } else {
                    if (!Transaction.validate(transaction)) {
                        throw new Error('Invalid mining rewards!');
                    }
                }

                const correctBalance = Wallet.calculateBalance({ chain: this.chain, address: transaction.input.address });

                if (transaction.input.amount !== correctBalance) {
                    throw new Error('Wrong input amount');
                }

                if (transactionSet.has(transaction)) {
                    throw new Error('Duplicated transaction in the block');
                } else {
                    transactionSet.add(transaction);
                }
            }
        }
        return true;
    }
}


