import {Router} from 'express';
import * as rolesController from '../controller/rolesController';
import { createRolesSchema } from '../schemas/rolesSchema';
import { validateRequestBody } from '../middlewares/validatorMiddleware';

const router = Router();

router.post('/create', validateRequestBody(createRolesSchema), rolesController.createRole);
router.get('/', rolesController.getAllRoles);


export default router;