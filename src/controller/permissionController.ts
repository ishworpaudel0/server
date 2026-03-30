import { Request, Response, NextFunction } from "express";
import * as permissionService from "../services/permissionServices";
import { successResponse, errorResponse } from "../utils/responseHelper";

export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await permissionService.createPermission(req.body);
        return successResponse(res, {
            data: response,
            message: "Permission created successfully",
        });
    }
         catch (error) {
   
            next(error);
            return errorResponse(res, {
                status: 500,
                message: "Server error during permission creation",
            });
        }
    }
    