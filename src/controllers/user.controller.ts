import { Request, Response } from "express";
import { prisma } from "../server";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await prisma.user.findMany();

    
    res.status(200).json(getUsers);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default { createUser, getUsers };
