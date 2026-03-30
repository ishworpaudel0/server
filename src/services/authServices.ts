import { userRegister, userLogin } from "../interfaces/user";
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


export const register = async (data: userRegister) => {
    const { name, email, password } = data;
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        throw new Error ("User already Exist!")
    }
    const hashedPassword = await bcrypt.hash (password, noOfSalt);

    return await userModel.create ({ name, email, password: hashedPassword });
}

export const login = async (data: userLogin) => {
    const { email, password } = data;
    const user = await userModel.findOne({email}).select("+password");

    if (!user) {
        logger.warn ("User email not found"+ email)
        throw new Error ("No Valid User.")
    }
    const isPasswordValid = await bcrypt.compare (password, user.password)

    if (!isPasswordValid) {
        logger.warn ("Password doent match for user" + email)
        throw new Error ("Password not Valid!");
    }
   const accessToken = await generateAccessToken(user._id as Types.ObjectId, user.email);
   const refreshToken = await generateRefreshToken(user._id as Types.ObjectId);
   const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); //set expiry to 30 minutes
       await sessionModel.create({ userId: user._id, refreshToken, expiresAt });
   return {
    accessToken,
    refreshToken,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
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

    const newAccessToken = generateAccessToken(user._id as Types.ObjectId, user.email);

    return { accessToken: newAccessToken };
};