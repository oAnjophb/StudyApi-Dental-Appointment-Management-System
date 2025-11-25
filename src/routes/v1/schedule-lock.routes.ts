import { Router } from "express";
import { ScheduleLockController } from "../../controllers/v1/schedule-lock.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const routes = Router();
const controller = new ScheduleLockController();

routes.use(ensureAuthenticated);

routes.post("/", canDoThis(["ADMIN", "DENTIST"]), controller.create);
routes.get(
  "/:dentistId",
  canDoThis(["ADMIN", "DENTIST", "RECEPTIONIST"]),
  controller.list
);

export default routes;
