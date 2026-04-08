import { Router } from "express";
import * as authController from '../controller/authController';
import { validateRequestBody } from "../middlewares/validatorMiddleware";
import { createUser, login } from "../schemas/authSchemas";

const router = Router();

router.post('/api/register', validateRequestBody(createUser), authController.register);
router.post('/api/login', validateRequestBody(login), authController.login);
router.post('/api/logout', authController.logout);
router.post('/api/refresh-token', authController.refreshToken);

export default router;