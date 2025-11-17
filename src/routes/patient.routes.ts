import express from "express";
import patientController from "../controllers/patient.controller";

const router = express.Router();

router.get("/patients", patientController.getPatient);
router.post("/patient/create", patientController.createPatient);

export default router;
