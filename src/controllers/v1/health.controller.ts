import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class HealthController {
  async check(req: Request, res: Response) {
    try {
      await prisma.$queryRaw`SELECT 1`;

      return res.status(200).json({
        message: "API is running",
        status: "OK",
        environment: process.env.NODE_ENV || "development",
        database: "Connected",
        timestamp: new Date(),
      });
    } catch (error) {
      return res.status(500).json({
        message: "API is down",
        status: "ERROR",
        database: "Disconnected",
      });
    }
  }
}
