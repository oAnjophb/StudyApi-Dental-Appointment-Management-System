import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
import dotenv from "dotenv";
import helmet from "helmet";

import { corsMiddleware } from "./middlewares/cors.middleware";

import healthRoutes from "./routes/v1/health.routes";
import userRoutes from "./routes/v1/user.routes";
import authRouter from "./routes/v1/auth.routes";
import patientRoutes from "./routes/v1/patient.routes";
import dentistRoutes from "./routes/v1/dentist.routes";
import serviceRoutes from "./routes/v1/service.routes";
import appointmentRoutes from "./routes/v1/appointment.routes";
import availabilityRoutes from "./routes/v1/availability.routes";
import scheduleLockRoutes from "./routes/v1/schedule-lock.routes";

dotenv.config();

const app = express();
app.use(corsMiddleware);

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use("/", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/dentists", dentistRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/availabilities", availabilityRoutes);
app.use("/api/v1/locks", scheduleLockRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: `Route '${req.originalUrl}' not found`,
  });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`\nServer listen on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failure starting server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
