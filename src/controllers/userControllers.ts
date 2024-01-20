import { Request, Response } from "express";
import { prisma } from "../database";

// CREATE NEW USER FUNCTION
export const create = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL USERS FUNCTION
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
};

// GET USER BY ID FUNCTION
export const getUserID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      include: {
        permission: true,
      },
    });

    if (!user) {
      return res.json({
        error: true,
        message: "Error: User Not Found",
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE USER BY ID FUNCTION
export const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const usersWithPermissions = await prisma.user.findFirst({
    where: { id: Number(id) },
    include: {
      permission: true,
    },
  });

  if (!usersWithPermissions?.permission?.editpermission) {
    // throw new Error("Profile Permition not found!!");
    return res.json({
      error: true,
      message: "Error: Profile Permission Not Found",
    });
  }

  if (!usersWithPermissions) {
    return res.json({
      error: true,
      message: "Error: User Not Found",
    });
  }

  const user = await prisma.user.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name,
      email,
    },
  });

  return res.json({
    user,
  });
};

// DELETE USER BY ID FUNCTION
export const deleteUserID = async (req: Request, res: Response) => {
  try {

    const {id} = req.params;
    await prisma.$transaction([
      // Deletar a permissão associada primeiro
      prisma.permission.deleteMany({
        where: {
          userId: Number(id),
        },
      }),
      // Deletar o usuário
      prisma.user.delete({
        where: {
          id: Number(id),
        },
      }),
    ]);

    return res.json({
      success: true,
      message: "User and associated permission deleted successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
