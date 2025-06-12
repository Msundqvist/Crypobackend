import { promisify } from 'util';
import jwt from "jsonwebtoken";
import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";
import AppError from "../models/error/appError.mjs";
import UserRepository from "../repositories/users-repositorys.mjs";


export const loginUser = catchErrorAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('e-post eller lösenord saknas', 400));
    }

    const user = await new UserRepository().find(email, true)

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError('e-poost eller lösenord är felaktigt', 401))
    }

    const token = createToken(user._id)
    res.status(200).json({ success: true, statusCode: 200, data: { token: token } })
});
export const protect = catchErrorAsync(async (req, res, next) => {
    console.log('Jag skyddar resursen...')
    let token;

    if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Du måste vara inloggad', 401))
    }
    console.log(token)

    const decoded = await verifyToken(token)
    console.log(decoded)
    next();
})

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

const verifyToken = async (token) => {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET)
}