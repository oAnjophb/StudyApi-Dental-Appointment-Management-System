import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { corsMiddleware } from "./middlewares/cors.middleware";
import healthRoutes from "./routes/v1/health.routes";
import { prisma } from "./lib/prisma";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
// app.use("/api/v1/users", userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`,
  });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    
    app.listen(PORT, () => {
      console.log(`\nServer rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failure starting server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
