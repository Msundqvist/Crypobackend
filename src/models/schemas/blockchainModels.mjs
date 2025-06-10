import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema({
    recipient: {
        type: String,
        required: [true, 'Avsändare måste anges']
    },
    amount: {
        type: Number,
        required: [true, 'Saldo måste anges']

    }
})

export default mongoose.model('Block', blockchainSchema)