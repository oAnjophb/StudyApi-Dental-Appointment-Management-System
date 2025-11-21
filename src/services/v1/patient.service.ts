import { prisma } from "../../lib/prisma";
import {
  CreatePatientDTO,
  UpdatePatientDTO,
} from "../../dtos/create-patient.dto";

export class PatientService {
  async create({
    name,
    phone,
    email,
    birthDate,
    address,
    notes,
  }: CreatePatientDTO) {
    const patient = await prisma.patient.create({
      data: {
        name,
        phone,
        email,
        birthDate,
        address,
        notes,
      },
    });
    return patient;
  }

  async list() {
    return await prisma.patient.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: number, data: UpdatePatientDTO) {
    const patientExists = await prisma.patient.findUnique({ where: { id } });
    if (!patientExists) throw new Error("Patient not found");

    const birthDate = data.birthDate ? new Date(data.birthDate) : undefined;

    return await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        birthDate,
      },
    });
  }

  async delete(id: number) {
    const patientExists = await prisma.patient.findUnique({ where: { id } });
    if (!patientExists) throw new Error("Patient not found");

    return await prisma.patient.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
