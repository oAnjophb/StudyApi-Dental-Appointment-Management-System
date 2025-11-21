import { Router } from "express";
import { DentistController } from "../../controllers/v1/dentist.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const dentistRoutes = Router();
const controller = new DentistController();

dentistRoutes.use(ensureAuthenticated);

dentistRoutes.post("/", canDoThis(["ADMIN"]), controller.create);
dentistRoutes.get(
  "/",
  canDoThis(["ADMIN", "RECEPTIONIST", "DENTIST"]),
  controller.list
);

export default dentistRoutes;
