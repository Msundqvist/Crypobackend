import userModel from "../models/schemas/userModel.mjs";

export default class UserRepository {

    async add(user) {
        await userModel.create(user)
        user.password = undefined;
        return user;
    }

    async find(email, login) {
        return login === true
            ? await userModel.findOne({ email }).select('+password')
            : await userModel.findOne({ email });
    }

    async list() {
        return await userModel.find();
    }
}