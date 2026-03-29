import { Router } from "express";
import * as sessionController from "../controller/sessionController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Apply 'protect' to all routes in this file
router.get('/', protect, sessionController.getSessionsHandler);
router.delete('/:sessionId', protect, sessionController.logoutSessionHandler);

export default router;