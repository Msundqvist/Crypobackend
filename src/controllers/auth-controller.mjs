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
    res.status(200).json({ success: true, statusCode: 200, data: '' })
});