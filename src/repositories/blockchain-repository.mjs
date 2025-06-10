import blockchainModels from "../models/schemas/blockchainModels.mjs";
import { blockchain } from "../server.mjs";


export default class BlockchainRepository {

    async add(block) {
        block.id = crypto.randomUUID().replaceAll('-', '')
        return await blockchainModels.create(block)
    }

    async list() {
        return await blockchainModels.find();
    }
    async find(id) {
        return await blockchainModels.findById(id);
    }


    /* async cleanUpBlockchainData() {
         const blocks = blockchain.chain.slice(1);
         const list = blocks.map((blocks) => blocks.data.data);
         return list;
     }*/
}