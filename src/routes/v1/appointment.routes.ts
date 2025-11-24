import { Router } from "express";
import { AppointmentController } from "../../controllers/v1/appointment.controller";
import { ensureAuthenticated } from "../../middlewares/auth.middleware";
import { canDoThis } from "../../middlewares/permissions.middleware";

const appointmentRoutes = Router();
const controller = new AppointmentController();

appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.post(
  "/",
  canDoThis(["ADMIN", "RECEPTIONIST"]),
  controller.create
);

appointmentRoutes.get(
  "/",
  canDoThis(["ADMIN", "RECEPTIONIST", "DENTIST"]),
  controller.list
);

appointmentRoutes.get(
  "/patient/:patientId",
  canDoThis(["ADMIN", "RECEPTIONIST", "DENTIST"]),
  controller.listByPatient
);

export default appointmentRoutes;
