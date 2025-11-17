import { PrismaClient } from "@prisma/client";

import userRoutes from "./routes/user.routes";
import patientRoutes from "./routes/patient.routes";

import express, { Request, Response } from "express";
import cors from "cors";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  const options: cors.CorsOptions = {
    origin: [process.env.FRONTEND_URL || "http://127.0.0.1:5500"],
  };

  app.use(cors(options));
  app.use(express.json());
  
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", patientRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error("Error starting server:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
