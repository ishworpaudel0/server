import { userRegisterRequest, userLoginRequest, UserWithRolesAndPermission } from "../interfaces/userInterface";
import { noOfSalt } from "../constants/noOfSalt";
import userModel from "../models/userModel"
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/authTokens";
import logger from "../utils/logger";
import sessionModel from "../models/sessionModel";
import jwt from "jsonwebtoken";
import { config } from "../config";
import SessionModel from "../models/sessionModel";
import UserModel from "../models/userModel";
import { Types } from "mongoose";
import RoleModel from "../models/rolesModel";


export const register = async (data: userRegisterRequest) => {
    const { name, email, password, roles} = data;
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        throw new Error ("User already Exist!")
    }
    let rolesId: Types.ObjectId[] = [];
    if (roles && roles.length > 0) {
        const fetchedRoles = await RoleModel.find({ name: { $in: roles } });
        rolesId = fetchedRoles.map(role => role._id);

        if (rolesId.length !== roles.length) {
            throw new Error("One or more roles do not exist");
        }
    }
    const hashedPassword = await bcrypt.hash (password, noOfSalt);

    return await userModel.create ({ name, email, password: hashedPassword, roles: rolesId });
}

export const login = async (data: userLoginRequest) => {
    const { email, password } = data;
    const user = await UserModel.findOne({ email }).populate({
        path: "roles",
        populate: {
            path: "permissions"
        }
    }).select("+password") as UserWithRolesAndPermission;

    if (!user) {
        logger.warn ("User email not found"+ email)
        throw new Error ("No Valid User.")
    }
    const isPasswordValid = await bcrypt.compare (password, user.password)

    if (!isPasswordValid) {
        logger.warn ("Password doent match for user" + email)
        throw new Error ("Password not Valid!");
    }
    const roles = user?.roles?.map((role) => role.name) ?? [];
    const permissions = user?.roles?.flatMap((role) => role.permissions?.map((permission) => permission.name) ?? []) ?? [];

   const accessToken = await generateAccessToken(user, roles, permissions);
   const refreshToken = await generateRefreshToken(user);

   const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); //set expiry to 30 minutes
       await sessionModel.create({ userId: user._id, refreshToken, expiresAt });
   return {
    accessToken,
    refreshToken,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    }
   }
}
export const logout = async (userId: string) => {
    return await sessionModel.deleteMany({ user: userId });
}
export const refreshAccessToken = async (refreshToken: string) => {
    const decoded: any = jwt.verify(refreshToken, config.JWT_SECRET);
    const session = await SessionModel.findOne({ 
        userId: decoded.userId, 
        refreshToken 
    });

    if (!session || new Date() > session.expiresAt) {
        throw new Error("Refresh token expired or invalid");
    }

    const user = await UserModel.findById(decoded.userId);
    if (!user) throw new Error("User not found");

    const newAccessToken = generateAccessToken(user as unknown as UserWithRolesAndPermission);

    return { accessToken: newAccessToken };
};