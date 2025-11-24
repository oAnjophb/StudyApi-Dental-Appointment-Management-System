import { Request, Response } from "express";
import { AppointmentService } from "../../services/v1/appointment.service";

const serviceLayer = new AppointmentService();

export class AppointmentController {
  create = async (req: Request, res: Response) => {
    try {
      const loggedUserId = req.user_id;

      const result = await serviceLayer.create(req.body, Number(loggedUserId));

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Internal Error" });
    }
  };

  list = async (req: Request, res: Response) => {
    const result = await serviceLayer.list();
    return res.json(result);
  };

  listByPatient = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.params;
      const result = await serviceLayer.patientHistory(Number(patientId));

      return res.json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Patient not found")
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Internal error" });
    }
  };
}
