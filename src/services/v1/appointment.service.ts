import { prisma } from "../../lib/prisma";
import { CreateAppointmentDTO } from "../../dtos/create-appointment.dto";
import { AppointmentStatus } from "@prisma/client";
import { getMinutesFromDate, getWeekdayFromDate } from "../../utils/time.utils";

export class AppointmentService {
  async create(
    {
      patientId,
      dentistId,
      serviceId,
      startDateTime,
      notes,
    }: CreateAppointmentDTO,
    createdById: number
  ) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error("Service not found");

    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + service.duration * 60000);

    const weekday = getWeekdayFromDate(startDate);
    const startMinutes = getMinutesFromDate(startDate);
    const endMinutes = getMinutesFromDate(endDate);

    const workingSlot = await prisma.availability.findFirst({
      where: {
        dentistId: dentistId,
        weekday: weekday,
        startTime: { lte: startMinutes },
        endTime: { gte: endMinutes },
      },
    });

    if (!workingSlot) {
      throw new Error(
        "Dentist is not working at this time (Check availability)"
      );
    }

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

    const isBlocked = await prisma.scheduleLock.findFirst({
      where: {
        dentistId: dentistId,
        startDate: { lte: endDate },
        endDate: { gte: startDate },
      },
    });
    if (isBlocked) {
      throw new Error(
        `Dentist schedule is locked for this date: ${isBlocked.reason}`
      );
    }

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

  async patientHistory(patientId: number) {
    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patientExists) throw new Error("Patient not found");

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: patientId,
      },
      include: {
        dentist: {
          include: {
            user: { select: { name: true } },
          },
        },
        service: {
          select: { name: true, duration: true },
        },
      },
      orderBy: {
        startDateTime: "desc",
      },
    });

    return appointments;
  }

  async updateStatus(
    appointmentId: number,
    status: AppointmentStatus,
    userId: number,
    notes?: string
  ) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new Error("Appointment not found");

    if (
      appointment.status === AppointmentStatus.COMPLETED &&
      status !== AppointmentStatus.COMPLETED
    ) {
      throw new Error("Cannot change status of a completed appointment");
    }

    const newNotes = notes
      ? appointment.notes
        ? `${appointment.notes} | ${notes}`
        : notes
      : appointment.notes;

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: status,
        notes: newNotes,
        updatedById: userId,
      },
      include: {
        patient: { select: { name: true } },
        service: { select: { name: true } },
      },
    });

    return updatedAppointment;
  }
}
