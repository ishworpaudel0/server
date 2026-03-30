import { Request, Response, NextFunction } from "express";
import * as authServices from "../services/authServices";
import { successResponse, errorResponse } from "../utils/responseHelper";
import httpCodes from "../constants/httpCodes";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authServices.register(req.body);

    return successResponse(res, {
      status: httpCodes.RESOURCE_CREATED.statusCode,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authServices.login(req.body);
    return successResponse(res, {
      data: result,
      status: httpCodes.RESOURCE_CREATED.statusCode,
      message: "Login successful",
    });
  } catch (error: any) {
    next(error);
  }
};
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, {
        status: 400,
        message: "Refresh token is required",
      });
    }

    await authServices.logout(refreshToken);

    return successResponse(res, {
      message: "Logged out successfully",
      status: 200,
    });
  } catch (error: any) {
    next(error);
    return errorResponse(res, {
      status: 500,
      message: "Server error during logout",
    });
    ``;
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, {
        status: 401,
        message: "Refresh Token required",
      });
    }

    const result = await authServices.refreshAccessToken(refreshToken);

    return successResponse(res, {
      data: result,
      message: "Token refreshed successfully",
    });
  } catch (error: any) {
    next(error);
    return errorResponse(res, {
      status: 403,
      message: "Invalid Refresh Token",
    });
  }
};
