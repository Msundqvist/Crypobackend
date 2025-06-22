import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema({
    blockchain: [mongoose.Schema.Types.Mixed]
})

export default mongoose.model('blockchain', blockchainSchema)