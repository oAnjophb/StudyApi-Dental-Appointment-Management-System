import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export function canDoThis(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({ error: "User not authenticated" });

    const user = await prisma.user.findUnique({
      where: { id: Number(user_id) },
    });

    if (!user) return res.status(400).json({ error: "User does not exist" });

    if (!roles.includes(user.role))
      return res
        .status(403)
        .json({
          error:
            "Forbidden: You do not have permission to access this resource",
          required_roles: roles,
          your_role: user.role,
        });

    return next()
  };
}
