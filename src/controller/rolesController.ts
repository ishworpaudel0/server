import {Request, Response, NextFunction} from 'express';
import { successResponse } from '../utils/responseHelper';
import * as roleServices from '../services/rolesServices';

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await roleServices.createRole(req.body);
        return successResponse(res, {data: response, message: "Role created successfully!"});
    }
    catch (error) {
        next(error);
    }
}
 
export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await roleServices.getAllRoles();
        return successResponse(res, {data: response, message: "Roles fetched successfully!"});
    }
    catch (error) {
        next(error);
    }
}