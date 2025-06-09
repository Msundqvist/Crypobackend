import { blockchain } from '../server.mjs';
import AppError from '../models/error/appError.mjs';

export default class BlockchainRepository {

    async listAllBlocks() {
        const blocks = await this.cleanUpBlockchainData();
        return blocks
    }


    async cleanUpBlockchainData() {
        const blocks = blockchain.chain.slice(1);
        const list = blocks.map((blocks) => blocks.data.data);
        return list;
    }
}