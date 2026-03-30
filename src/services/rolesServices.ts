import mongoose from "mongoose";
import { createRoleRequest } from "../interfaces/rolesInterface";
import Role from "../models/rolesModel";
import PermissionModel from "../models/permissionModel";
import RoleModel from "../models/rolesModel";

export const createRole = async (data: createRoleRequest) => {
  const { roleName, description, permissions } = data;
  const existingRole = await Role.findOne({ roleName });

  if (existingRole) {
    throw new Error("Role already exists!");
  }
  let permissionIds: mongoose.Types.ObjectId[] = [];

  if (permissions && permissions.length > 0) {
    const perms = await PermissionModel.find({ name: { $in: permissions } });
    permissionIds = perms.map((p) => p._id);

    if (permissionIds.length !== permissions.length) {
      throw new Error("One or more permissions are invalid!");
    }
  }
  return RoleModel.create({
    roleName,
    description,
    ...(permissionIds.length > 0 && { permissions: permissionIds }),
  });
};
export const getAllRoles = async () => {
    return await RoleModel.find().populate("permissions", "name description");
    }

