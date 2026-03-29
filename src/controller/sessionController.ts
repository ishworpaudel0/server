import { Request, Response } from "express";
import * as sessionService from "../services/sessionServices";
import { successResponse, errorResponse } from "../utils/responseHelper";
import httpCodes from "../constants/httpCodes";

export const getSessionsHandler = async (req: Request, res: Response) => {
    try {
        // 'req.user' comes from your 'protect' middleware
        const userId = (req as any).user.userId; 
        const sessions = await sessionService.findAllSessions(userId);

        return successResponse(res, {
            data: sessions,
            message: "Sessions retrieved successfully"
        });
    } catch (error: any) {
        return errorResponse(res, { message: error.message });
    }
};

export const logoutSessionHandler = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return errorResponse(res, { message: "Session ID is required"});
        }
        await sessionService.deleteSession(sessionId);
        return successResponse(res, { message: "Session terminated" });
    } catch (error: any) {
        return errorResponse(res, { message: error.message });
    }
};