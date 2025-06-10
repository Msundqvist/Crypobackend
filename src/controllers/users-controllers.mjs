import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";
import UserRepository from "../models/schemas/userModel.mjs"

export const addUser = catchErrorAsync(async (req, res, next) => {
    const user = await new UserRepository().add(req.body);
    res.status(201).json({ success: true, statusCode: 201, data: { user } })
})

export const listUsers = catchErrorAsync(async (req, res, next) => {
    const users = await new UserRepository().list();
    res.status(200).json({ success: true, statusCode: 200, data: { users } })
})