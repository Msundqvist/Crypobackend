import { blockchain } from "../server.mjs";


export default class BlockchainRepository {

    async listAllBlocks() {
        const blocks = await this.cleanUpBlockchainData();
        return blocks
    }

    async add(block) {
        blockchain.addBlock({ data: block })
        return blockchain.chain
    }

    async cleanUpBlockchainData() {
        const blocks = blockchain.chain.slice(1);
        const list = blocks.map((blocks) => blocks.data.data);
        return list;
    }
}