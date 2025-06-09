import { MINE_RATE } from "../../utilities/config.mjs";
import { generateHash } from "../../utilities/hash.mjs";
import { GENESIS_BLOCK } from "./genesis.mjs";

export default class Block {
    constructor({ timestamp, hash, lastHash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_BLOCK);
    }

    static mineBlock({ previousBlock, data }) {
        let timestamp, hash;
        const lastHash = previousBlock.hash;
        let { difficulty } = previousBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficultylevel({
                block: previousBlock, timestamp
            })
            hash = generateHash(timestamp, lastHash, data, nonce, difficulty);

        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({ timestamp, hash, lastHash, data, nonce, difficulty });
    }

    static adjustDifficultylevel({ block, timestamp }) {
        const { difficulty } = block;

        if (difficulty < 1) return 1;

        if (timestamp - block.timestamp > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}