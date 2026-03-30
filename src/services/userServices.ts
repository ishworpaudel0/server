import path from "node:path";
import UserModel from "../models/userModel";

export const getAll = async () => {
    return await UserModel.find({});
}