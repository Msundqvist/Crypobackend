import blockchain from "../models/schemas/blockchainModel.mjs";

export default class BlockchainRepository {

    async add(block) {
        block.id = crypto.randomUUID().replaceAll('-', '')
        return await blockchain.create(block)
    }

    async list() {
        return await blockchain.find();
    }
    async find(id) {
        return await blockchain.findById(id);
    }


}