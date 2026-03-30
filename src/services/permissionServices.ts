import { CreatePermissionRequest } from "../interfaces/permissionInterface";
import PermissionModel from "../models/permissionModel";

export const createPermission = async(data: CreatePermissionRequest) => {
    const { permissionName, description } = data;
    const existingPermission = await PermissionModel.findOne({ permissionName });
    if (existingPermission) {
        throw new Error("Permission already exists!");
    }
    return await PermissionModel.create({ permissionName, description });
}
