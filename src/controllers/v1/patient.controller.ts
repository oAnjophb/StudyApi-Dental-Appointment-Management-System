import { Request, Response } from "express";
import { PatientService } from "../../services/v1/patient.service";

const service = new PatientService();

export class PatientController {
  create = async (req: Request, res: Response) => {
    try {
      
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "Error creating pacient" });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const result = await service.list();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await service.update(Number(id), req.body);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: "Error updating patient" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await service.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: "Error deleting patient" });
    }
  };
}
