import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getAllCarsController(req: Request, res: Response) {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { name: "asc" },
    });

    return res.json({ cars });
  } catch (error) {
    console.error("Error from get all cars: ", error);
    return res.status(500).json({ error: "Failed to retrieve cars" });
  }
}
