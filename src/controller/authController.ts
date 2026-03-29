import { Request , Response, NextFunction } from "express";
import * as authServices from '../services/authServices';
import { successResponse, errorResponse} from "../utils/responseHelper";
import httpCodes  from "../constants/httpCodes";
import { error } from "winston";

export const register = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        await authServices.register(req.body);

        return successResponse(res, { status: httpCodes.RESOURCE_CREATED.statusCode })

        res.status(httpCodes.RESOURCE_CREATED.statusCode).send({});

    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};
export const login = (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = authServices.login(req.body);
        return successResponse(res, { 
            data: result, 
            status: httpCodes.RESOURCE_CREATED.statusCode,
            message: "Login successful"
         });
    }
   catch (error: any) {
        return errorResponse(res, {
            message: error.message,
            status: httpCodes.INTERNAL_SERVER_ERROR.statusCode
        });
    }
}
export const logout = (req: Request, res: Response) => {
    return successResponse(res, {
        message: "Logged out successfully",
        status: httpCodes.RESOURCE_CREATED.statusCode
    });
};
