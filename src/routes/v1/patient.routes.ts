import { Router } from "express";
import { PatientController } from "../../controllers/v1/patient.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const patientRoutes = Router()
const controller = new PatientController()

patientRoutes.use(ensureAuthenticated)
patientRoutes.use(canDoThis(["ADMIN", "RECEPTIONIST"]))

patientRoutes.post("/", controller.create);
patientRoutes.get("/", controller.list);
patientRoutes.put("/:id", controller.update);
patientRoutes.delete("/:id", controller.delete);

export default patientRoutes