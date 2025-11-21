import { Router } from "express";
import { UserController } from "../../controllers/v1/user.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  "/",
  ensureAuthenticated,
  canDoThis(["ADMIN"]),
  userController.createUser
);

userRoutes.get(
  "/",
  ensureAuthenticated,
  canDoThis(["ADMIN", "RECEPTIONIST"]),
  userController.getAllUsers
);

export default userRoutes;
