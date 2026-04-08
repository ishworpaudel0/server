import { CreatePermissionRequest } from "../interfaces/permissionInterface";
import PermissionModel from "../models/permissionModel";

export const createPermission = async(data: CreatePermissionRequest) => {
    const { name, description } = data;
    const existingPermission = await PermissionModel.findOne({ name });
    if (existingPermission) {
        throw new Error("Permission already exists!");
    }
    return await PermissionModel.create({ name, description });
}
export const getAllPermissions = async () => {
    return await PermissionModel.find({});
}