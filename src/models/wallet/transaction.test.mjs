import { describe, it, expect } from 'vitest';
import Miner from '../miner/Miner.mjs'
import Transaction from '../wallet/Transaction.mjs';
import blockchainModel from '../schemas/blockchainModel.mjs';

Transaction.transactionReward = () => ({ id: 'rewardTransaction' });
blockchainModel.create = () => { }

describe('Miner', () => {
    it('adds a block with  reward transaction and is valid', () => {
        const blockchain = {
            chain: [],
            addBlock: ({ data }) => { blockchain.chain.push({ data }); }
        };

        const miner = new Miner({
            transactionPool: {
                validateTransactions: () => ['transaction1'],
                clearTransactions: () => { }
            },
            wallet: { address: 'miner-address' },
            blockchain,
            server: { broadcastChain: () => { } }
        });

        miner.mineTransactions();

        expect(blockchain.chain.length).toBe(1);
        expect(blockchain.chain[0].data).toEqual(['transaction1', { id: 'rewardTransaction' }]);
    });
});