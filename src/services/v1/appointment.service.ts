import { prisma } from "../../lib/prisma";
import { CreateAppointmentDTO } from "../../dtos/create-appointment.dto";
import { Appointment, AppointmentStatus } from "@prisma/client";

export class AppointmentService {
  async create({
    patientId,
    dentistId,
    serviceId,
    startDateTime,
    notes,
  }: CreateAppointmentDTO, createdById: number) {

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error("Service not found");

    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + service.duration * 60000);

    const conflictAppoiment = await prisma.appointment.findFirst({
      where: {
        dentistId,
        status: {
          not: AppointmentStatus.CANCELLED,
        },
        AND: [
          { startDateTime: { lt: endDate } },
          { endDateTime: { gt: startDate } },
        ],
      },
    });

    if (conflictAppoiment)
      throw new Error("Denstist is not available at this time");

    const appointment = await prisma.appointment.create({
      data: {
        startDateTime: startDate,
        endDateTime: endDate,
        patientId,
        dentistId,
        serviceId,
        notes,
        status: AppointmentStatus.SCHEDULED,
        createdById: createdById,

        agreedPrice: service.price || 0,
      },
      include: {
        patient: { select: { name: true } },
        dentist: { include: { user: { select: { name: true } } } },
        service: true,
      },
    });

    return appointment;
  }

  async list() {
    return await prisma.appointment.findMany({
      include: {
        patient: { select: { name: true, phone: true } },
        dentist: { include: { user: { select: { name: true } } } },
        service: { select: { name: true, duration: true } },
      },
      orderBy: {
        startDateTime: "asc",
      },
    });
  }
}
