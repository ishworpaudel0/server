import {config} from "../config";
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (userId: string | Types.ObjectId, email: string) => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {
        userId,
        email
    }
    , config.JWT_SECRET, { expiresIn: '1d' }
    );
}

export const generateRefreshToken = (userId: string | Types.ObjectId ) => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {userId}
    , config.JWT_SECRET, { expiresIn: '30m' }
    );
}