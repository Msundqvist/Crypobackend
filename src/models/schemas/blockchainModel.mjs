import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema({
    chain: { type: Array }
})

export default mongoose.model('blockchain', blockchainSchema)