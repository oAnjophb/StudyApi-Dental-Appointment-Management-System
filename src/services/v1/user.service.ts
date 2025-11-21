import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { CreateUserDTO } from "../../dtos/create-user.dto";
import { UserRole } from "@prisma/client";

export class UserService {
  async createUser({ name, email, password, role }: CreateUserDTO) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hash = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role: role || UserRole.RECEPTIONIST,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }
}
