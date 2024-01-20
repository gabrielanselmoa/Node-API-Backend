import { Request, Response } from "express";
import { prisma } from "../database";

// Get All Permissions
export const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const allPermissions = await prisma.permission.findMany();

    res.json(allPermissions);
  } catch (error) {
    res.json({ message: error });
  }
};

// Creating new Permission
export const createPermissions = async (req: Request, res: Response) => {
  try {
    const { editpermission, userId } = req.body;

    const newPermission = await prisma.permission.create({
      data: {
        editpermission,
        userId,
      },
    });
    res.json(newPermission);
  } catch (error) {
    res.json({ message: error });
  }
};
