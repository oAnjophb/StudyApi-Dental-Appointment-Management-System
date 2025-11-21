import { Request, Response } from "express";
import { DentistService } from "../../services/v1/dentist.service";

const service = new DentistService();

export class DentistController {
  create = async (req: Request, res: Response) => {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ erorr: "Internal error" });
    }
  };

  list = async (req: Request, res: Response) => {
    const result = await service.list();
    return res.json(result);
  };
}
