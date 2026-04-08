import path from "node:path";
import UserModel from "../models/userModel";
import RoleModel from "../models/rolesModel";
import mongoose from "mongoose";

export const getAll = async () => {
    return await UserModel.find({}).populate({
        path: "roles",
        populate: {
            path: "permissions"
        }
    });
}

export const updateUserRoles = async (userId: string, roles: string[]) => {
    let roleIds: mongoose.Types.ObjectId[] = [];

    if (roles && roles.length > 0) {
        const fetchedRoles = await RoleModel.find({ name: { $in: roles } });

        roleIds = fetchedRoles.map(r => r._id);

        if (roleIds.length !== roles.length) {
            throw new Error("Some roles do not exist");
        }
    }

    return await UserModel.findByIdAndUpdate(userId, { roles: roleIds }, { new: true }).populate({
        path: "roles",
        populate: {
            path: "permissions",
        }
    });
}
// userServices.ts

export const getById = async (userId: string) => {
    return await UserModel.findById(userId).populate({
        path: "roles",
        populate: {
            path: "permissions",
        }
    });
}