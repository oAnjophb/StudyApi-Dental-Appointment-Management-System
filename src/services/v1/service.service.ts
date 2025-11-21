import { prisma } from "../../lib/prisma";
import { CreateServiceDTO } from "../../dtos/create-service.dto";

export class ServicesOfClinic {
  async create({ name, duration, price }: CreateServiceDTO) {
    const serviceAlreadyExists = await prisma.service.findFirst({
      where: { name },
    });

    if (serviceAlreadyExists)
      throw new Error("Service with this name is already exists");

    const service = await prisma.service.create({
      data: {
        name,
        duration,
        price,
      },
    });

    return service;
  }

  async list() {
    return await prisma.service.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}
