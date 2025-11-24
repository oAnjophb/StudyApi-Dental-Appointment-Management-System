import { prisma } from "../../lib/prisma";
import {
  CreatePatientDTO,
  UpdatePatientDTO,
} from "../../dtos/create-patient.dto";

export class PatientService {
  async create(data: CreatePatientDTO) {
    const birthDateObject = data.birthDate ? new Date(data.birthDate) : null;

    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        birthDate: birthDateObject,
        notes: data.notes,
        zipCode: data.zipCode,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
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

    const { birthDate: string, ...restData } = data

    return await prisma.patient.update({
      where: { id },
      data: {
        ...restData,
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
