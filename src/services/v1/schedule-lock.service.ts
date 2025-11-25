import { prisma } from "../../lib/prisma";
import { CreateScheduleLockDTO } from "../../dtos/create-schedule-lock.dto";

export class ScheduleLockService {
  async create({
    dentistId,
    startDate,
    endDate,
    reason,
  }: CreateScheduleLockDTO) {
    const dentist = await prisma.dentist.findUnique({
      where: { userId: dentistId },
    });

    if (!dentist) throw new Error("Schedule not save: 'Dentist not found' ");

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) throw new Error("Start date must be before end date");

    const lock = await prisma.scheduleLock.create({
      data: {
        dentistId,
        startDate: start,
        endDate: end,
        reason,
      },
    });

    return lock;
  }

  async listByDentist(dentistId: number) {
    return await prisma.scheduleLock.findMany({
      where: { dentistId },
      orderBy: { startDate: "asc" },
    });
  }
}
