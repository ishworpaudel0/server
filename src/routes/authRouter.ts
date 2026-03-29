import { Router } from "express";
import * as authController from '../controller/authController';

const router = Router();

router.use('/api/register', authController.register);
router.use('/api/login', authController.login);
router.use('/api/logout', authController.logout);

export default router;