import { Router } from "express";
import * as userController from "../controller/userController";
import { authenticate, UserRequest } from "../middlewares/authMiddleware";


const router = Router();

router.get("/me", authenticate, (req: UserRequest, res) => {
    console.log("Authenticated user");

    console.log("Request", req.user);

    res.send({});
});

router.get("/", userController.getAll);

export default router;