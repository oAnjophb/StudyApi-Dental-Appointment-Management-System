import { Request, Response } from "express";
import { ScheduleLockService } from "../../services/v1/schedule-lock.service";

const service = new ScheduleLockService();

export class ScheduleLockController {
  create = async (req: Request, res: Response) => {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Internal Error",
      });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const { denstistId } = req.params;
      const result = await service.listByDentist(Number(denstistId));
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Internal Error" });
    }
  };
}
