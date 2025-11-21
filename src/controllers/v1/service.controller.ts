import { Request, Response } from "express";
import { ServicesOfClinic } from "../../services/v1/service.service";
import { error } from "console";

const serviceLayer = new ServicesOfClinic();

export class ServicesOfClinicController {
  create = async (req: Request, res: Response) => {
    try {
      const { name, duration, price } = req.body;

      const result = await serviceLayer.create({
        name,
        duration: Number(duration),
        price: Number(price),
      });

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal error" });
    }
  };

  list = async (req: Request, res: Response) => {
    const result = await serviceLayer.list();
    return res.json(result);
  };
}
