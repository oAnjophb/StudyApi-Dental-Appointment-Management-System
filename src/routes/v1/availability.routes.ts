import { Router } from "express";
import { AvailabilityController } from "../../controllers/v1/availability.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const routes = Router();
const controller = new AvailabilityController();

routes.use(ensureAuthenticated);

routes.use("/", canDoThis(["ADMIN", "DENTIST"]), controller.create);
routes.get("/:dentistId", controller.list);

export default routes;
