import mongoose from "mongoose";
import dotenv from "dotenv";
import PermissionModel from "../models/permissionModel";
import RoleModel from "../models/rolesModel";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import appPermissions from "../constants/permission";
import appRoles from "../constants/roles";
import { noOfSalt } from "../constants/noOfSalt";

dotenv.config();

const seed = async () => {
    const mongoURI = process.env.MONGO_URI;
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    const superAdminName = process.env.SUPER_ADMIN_NAME;

    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined");
    }

    if (!superAdminEmail) {
        throw new Error("SUPER_ADMIN_EMAIL is not defined");
    }

    if (!superAdminPassword) {
        throw new Error("SUPER_ADMIN_PASSWORD is not defined");
    }

    if (!superAdminName) {
        throw new Error("SUPER_ADMIN_NAME is not defined");
    }
    

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to DB for seeding");

    const permissionsList = [
        { name: appPermissions.CREATE_ROLES.name, description: appPermissions.CREATE_ROLES.description },
        { name: appPermissions.VIEW_ROLES.name, description: appPermissions.VIEW_ROLES.description },
        { name: appPermissions.UPDATE_ROLES.name, description: appPermissions.UPDATE_ROLES.description },
        { name: appPermissions.DELETE_ROLES.name, description: appPermissions.DELETE_ROLES.description },
        { name: appPermissions.CREATE_PERMISSIONS.name, description: appPermissions.CREATE_PERMISSIONS.description },
        { name: appPermissions.VIEW_PERMISSIONS.name, description: appPermissions.VIEW_PERMISSIONS.description },
        { name: appPermissions.UPDATE_PERMISSIONS.name, description: appPermissions.UPDATE_PERMISSIONS.description },
        { name: appPermissions.DELETE_PERMISSIONS.name, description: appPermissions.DELETE_PERMISSIONS.description },
        { name: appPermissions.MANAGE_USERS.name, description: appPermissions.MANAGE_USERS.description },
        { name: appPermissions.VIEW_USERS.name, description: appPermissions.VIEW_USERS.description },
        { name: appPermissions.UPDATE_USERS.name, description: appPermissions.UPDATE_USERS.description },
        { name: appPermissions.DELETE_USERS.name, description: appPermissions.DELETE_USERS.description },
    ]

    // Create permissions in the database
    const createdPermissions = await Promise.all(permissionsList.map(async (perm) => {
        const existingPermission = await PermissionModel.findOne({ name: perm.name });

        if (existingPermission) {
            return existingPermission;
        }

        return PermissionModel.create({ name: perm.name, description: perm.description });
    }))

    const roleList = [
        {
            name: appRoles.SUPER_ADMIN.name,
            description: appRoles.SUPER_ADMIN.description,
            permissions: createdPermissions.map(perm => perm._id) 

        },
        {
            name: appRoles.ADMIN.name,
            description: appRoles.ADMIN.description,
            permissions: createdPermissions.map(perm => perm._id) // Assign all permissions to admin
        }    
    ]

    // Create roles in the database
    const createdRoles = await Promise.all(roleList.map(async (role) => {
        const existingRole = await RoleModel.findOne({ name: role.name });

        if (existingRole) {
            return existingRole;
        }

        return RoleModel.create({ name: role.name, description: role.description, ...(role.permissions ? { permissions: role.permissions } : {}) });
    }))

    // Create super admin user if not exists
    const existingSuperAdmin = await UserModel.findOne({ email: superAdminEmail });

    if (!existingSuperAdmin) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, noOfSalt);

        await UserModel.create({
            name: superAdminName,
            email: superAdminEmail,
            password: hashedPassword,
            roles: [createdRoles[0]!._id] // Assign super admin role
        });
    }

    console.log("Seeding completed");
    
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
})
    