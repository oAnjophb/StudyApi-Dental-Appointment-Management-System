import { prisma } from "../server";
import { Request, Response } from "express";

const createPatient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    const newPatient = await prisma.patient.create({
      data: {
        name,
        phone,
      },
    });
    res.status(200).json(newPatient);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getPatient = async (req: Request, res: Response) => {
  try {
    const getPatient = await prisma.patient.findMany();

    res.status(200).json(getPatient);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default { createPatient, getPatient };
