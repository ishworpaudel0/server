import e, { Request, Response, NextFunction } from "express";
import * as userServices from "../services/userServices";
import { successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await userServices.getAll();

    response;

    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};
export const getMe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await userServices.getById(userId);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
};
export const updateUserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const { roleList } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await userServices.updateUserRoles(String(userId), roleList);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const response = await userServices.getById(userId as string);
        
        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }

        return successResponse(res, { data: response });
    } catch (error) {
        next(error);
    }
};