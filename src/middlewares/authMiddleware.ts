import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { errorResponse } from '../utils/responseHelper';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return errorResponse(res, { message: "No token, authorization denied", status: 401 });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return errorResponse(res, { message: "Token is not valid", status: 401 });
    }
};