import { UserRole } from "@prisma/client";
import { CreateDentistDTO } from "../../dtos/create-dentist.dto";
import { prisma } from "../../lib/prisma";

export class DentistService {
  async create({ userId, specialty }: CreateDentistDTO) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    if (user.role !== UserRole.DENTIST)
      throw new Error("User does not have DENTIST role");

    const dentist = await prisma.dentist.create({
      data: { userId, specialty },
      include: { user: { select: { name: true, email: true } } },
    });

    return dentist;
  }

  async list() {
    return await prisma.dentist.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
