import { Request, Response } from "express";
import { AvailabilityService } from "../../services/v1/availability.service";

const service = new AvailabilityService();

export class AvailabilityController {
  create = async (req: Request, res: Response) => {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ error: error instanceof Error ? error.message : "Error" });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const { dentistId } = req.params;
      const result = await service.listByDentist(Number(dentistId));
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error" });
    }
  };
}
