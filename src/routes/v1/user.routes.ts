import { Router } from "express";
import { UserController } from "../../controllers/v1/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getAllUsers)

export default userRoutes;
