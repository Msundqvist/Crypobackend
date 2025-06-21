import blockchain from "../models/schemas/blockchainModel.mjs";

export default class BlockchainRepository {

    async list() {
        return await blockchain.find();
    }
    async find(id) {
        return await blockchain.findById(id);
    }


}