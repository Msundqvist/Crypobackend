import blockchainModel from "../models/schemas/blockchainModel.mjs";

export default class BlockchainRepository {

    async add(block) {
        block.id = crypto.randomUUID().replaceAll('-', '')
        return await blockchainModel.create(block)
    }

    async list() {
        return await blockchainModel.find();
    }
    async find(id) {
        return await blockchainModel.findById(id);
    }


    /* async cleanUpBlockchainData() {
         const blocks = blockchain.chain.slice(1);
         const list = blocks.map((blocks) => blocks.data.data);
         return list;
     }*/
}