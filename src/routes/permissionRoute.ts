import { Router } from "express";
import * as permissionController from '../controller/permissionController';
import { createPermissionSchema } from "../schemas/permissionSchema"
import { validateRequestBody } from "../middlewares/validatorMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";


const router = Router();

router.post('/', authenticate , authorizeWithPermission({ permission: appPermissions.CREATE_PERMISSIONS.name}) ,validateRequestBody(createPermissionSchema), permissionController.createPermission);
router.get("/", permissionController.getAllPermissions);

export default router;