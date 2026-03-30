import { Router } from "express";
import * as permissionController from '../controller/permissionController';
import { createPermissionSchema } from "../schemas/permissionSchema"
import { validateRequestBody } from "../middlewares/validatorMiddleware";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post('/', authenticate ,validateRequestBody(createPermissionSchema), permissionController.createPermission);

export default router;