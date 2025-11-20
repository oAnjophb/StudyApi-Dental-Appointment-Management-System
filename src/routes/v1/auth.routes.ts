import { Router } from "express";
import { AuthController } from "../../auth/auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.handleLogin);

export default authRouter;
