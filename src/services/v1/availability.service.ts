import { prisma } from "../../lib/prisma";
import { CreateAvailabilityDTO } from "../../dtos/create-availability.dto";
import { convertHourToMinutes } from "../../utils/time.utils";

export class AvailabilityService {
  async create({
    dentistId,
    weekday,
    startTime,
    endTime,
  }: CreateAvailabilityDTO) {
    const dentist = await prisma.dentist.findUnique({
      where: { userId: dentistId },
    });

    if (!dentist) throw new Error("Dentist profile not found for this user");

    const startMinutes = convertHourToMinutes(startTime);
    const endMinutes = convertHourToMinutes(endTime);

    if (startMinutes >= endMinutes)
      throw new Error("Start time must be before end time");

    const conflict = await prisma.availability.findFirst({
      where: {
        dentistId,
        weekday,
        startTime: startMinutes,
      },
    });

    if (conflict) throw new Error("Availability slot already exists");

    return await prisma.availability.create({
      data: {
        dentistId,
        weekday,
        startTime: startMinutes,
        endTime: endMinutes,
      },
    });
  }

  async listByDentist(dentistUserId: number) {
    return await prisma.availability.findMany({
      where: { dentistId: dentistUserId },
      orderBy: { weekday: "asc" },
    });
  }
}
