import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Förnamn måste anges'],
    },
    lastName: {
        type: String,
        required: [true, 'Efternamn måste anges'],
    },
    email: {
        type: String,
        required: [true, 'E-post måste anges'],
    },
    password: {
        type: String,
        required: [true, 'Lösenord måste anges'],
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 11)
    next();
})

export default mongoose.model('User', userSchema);