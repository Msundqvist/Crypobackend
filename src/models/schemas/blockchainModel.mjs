import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema({
    chain: []
})

export default mongoose.model('Blockchain', blockchainSchema)