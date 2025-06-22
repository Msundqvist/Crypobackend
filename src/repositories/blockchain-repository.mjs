import blockchainModel from "../models/schemas/blockchainModel.mjs";

export default class BlockchainRepository {
    async add(data) {
        return await blockchainModel.create(data)
    }
    async list() {
        return await blockchainModel.find();
    }
    async find(id) {
        return await blockchainModel.findById(id);
    }


}