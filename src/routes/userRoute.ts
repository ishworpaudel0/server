import { Router } from "express";
import * as userController from "../controller/userController";
import { authenticate, AuthRequest } from "../middlewares/authMiddleware";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.get("/me", authenticate, userController.getMe);
router.get(
    "/:userId", 
    authenticate, 
    authorizeWithPermission({ permission: appPermissions.VIEW_USERS.name }), 
    userController.getUserById
);


router.get("/", authenticate, authorizeWithPermission({ permission: "view_users" }), userController.getAll);
router.patch("/:userId/roles", authenticate, authorizeWithPermission({ permission: appPermissions.MANAGE_USERS.name }), userController.updateUserRoles);

export default router;