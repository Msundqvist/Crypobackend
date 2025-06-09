import { server } from "../server.mjs";
import BlockchainRepository from "../repositories/blockchain-repository.mjs";
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllBlocks = catchErrorAsync(async (req, res, next) => {
    const blocks = await new BlockchainRepository().listAllBlocks();
    res.status(200).json({ success: true, statusCode: 200, data: blocks })
})

export const addBlock = catchErrorAsync(async (req, res, next) => {
    const block = await new BlockchainRepository().add(req.body);

    server.broadcastChain();

    res.status(201).json({ success: true, message: 'Block is added', data: { block: block } })
})