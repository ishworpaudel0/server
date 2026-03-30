import { Router } from "express";
import * as userController from "../controller/userController";
import { authenticate, AuthRequest } from "../middlewares/authMiddleware";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";

const router = Router();

router.get("/me", authenticate, (req: AuthRequest, res) => {
    console.log("Authenticated user");

    console.log("Request", req.user);

    res.send({});
});

router.get("/", authenticate, authorizeWithPermission({ permission: "view_users" }), userController.getAll);

export default router;