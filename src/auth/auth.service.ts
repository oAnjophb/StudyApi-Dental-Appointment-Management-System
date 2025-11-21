import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { loginDTO } from "../dtos/login.dto";

export class AuthService {
  async authenticate({ email, password }: loginDTO) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("Email or Password incorrect");
    
    const passwordCompare = compare(password, user.password);
    if (!passwordCompare) throw new Error("Email or password incorrect");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not found in .env");

    const token = sign(
      {
        id: user.id,
        role: user.role,
      },
      secret,
      {
        subject: String(user.id),
        expiresIn: "12h",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
