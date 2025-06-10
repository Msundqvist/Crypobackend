import { server } from "../server.mjs";
import BlockchainRepository from "../repositories/blockchain-repository.mjs";
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';


export const listAllBlocks = catchErrorAsync(async (req, res, next) => {
    const blockchain = await new BlockchainRepository().list();
    res.status(200).json({ success: true, statusCode: 200, data: blockchain })
})

export const addBlock = catchErrorAsync(async (req, res, next) => {
    const data = req.body;
    const block = await new BlockchainRepository().add(data);

    server.broadcastChain();

    res.status(201).json({ success: true, message: 'Block is added', data: { block: block } })
})

export const findBlock = catchErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const block = await new BlockchainRepository().find(id)
    res.status(200).json({ success: true, statusCode: 200, data: block })
})