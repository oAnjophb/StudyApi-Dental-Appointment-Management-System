import { Router } from "express";
import { ServicesOfClinicController } from "../../controllers/v1/service.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const serviceRoutes = Router();
const controller = new ServicesOfClinicController();

serviceRoutes.use(ensureAuthenticated);

serviceRoutes.post("/", canDoThis(["ADMIN"]), controller.create);

serviceRoutes.get(
  "/",
  canDoThis(["ADMIN", "RECEPTIONIST", "DENTIST"]),
  controller.list
);

export default serviceRoutes;
