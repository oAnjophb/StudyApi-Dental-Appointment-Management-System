import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import APIhealthRoute from "./routes/v1/health.routes";

dotenv.config();

const app: Express = express();
const prisma: PrismaClient = new PrismaClient();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", APIhealthRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`,
    method: req.method,
  });
});

async function loadRoutes() {
  try {
    // app.use('/api/v1', userRoutes);

    console.log("Routes loaded successfully");
  } catch (error) {
    console.error("Error loading routes:", error);
  }
}

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await loadRoutes();

    app.listen(PORT, () => {
      console.log(`\nServer rodando em http://localhost:${PORT}`);
      console.log(
        `CORS liberado para: ${
          process.env.CORS_ORIGIN || "http://localhost:3000"
        }\n`
      );
    });
    await prisma.$connect();
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
