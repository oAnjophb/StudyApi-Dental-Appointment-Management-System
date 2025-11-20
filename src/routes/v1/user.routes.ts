import { Router } from "express";
import { UserController } from "../../controllers/v1/user.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", ensureAuthenticated, userController.getAllUsers);

export default userRoutes;
