import { Router } from "express";
import { HealthController } from "../../controllers/v1/health.controller"

const healthRoutes = Router();
const healthController = new HealthController()

healthRoutes.get("/", healthController.check)

export default healthRoutes;
