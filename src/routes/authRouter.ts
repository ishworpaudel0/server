import { Router } from "express";
import * as authController from '../controller/authController';

const router = Router();

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.post('/api/logout', authController.logout);
router.post('/api/refresh-token', authController.refreshToken);

export default router;