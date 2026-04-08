import {Router} from 'express';
import * as rolesController from '../controller/rolesController';
import { createRolesSchema } from '../schemas/rolesSchema';
import { validateRequestBody } from '../middlewares/validatorMiddleware';
import { authorizeWithPermission } from '../middlewares/authorizeWithPermission';

const router = Router();

router.post('/create', authorizeWithPermission ,validateRequestBody(createRolesSchema), rolesController.createRole);
router.get('/', authorizeWithPermission ,rolesController.getAllRoles);


export default router;