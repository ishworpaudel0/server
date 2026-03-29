import { userRegister, userLogin } from "../interfaces/user";
import { noOfSalt } from "../constants/noOfSalt";
import userModel from "../models/userModel"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import {config} from "../config"

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
    const token = jwt.sign (
        { userId: user._id }, 
        config.JWT_SECRET, 
        { expiresIn: '1d' } 
    )
    return { 
        token, 
        user: { id: user._id, name: user.name, email: user.email } 
    };
}