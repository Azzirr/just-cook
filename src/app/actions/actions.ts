"use server";
import { PrismaClient } from "@prisma/client";
// TODO: change it to not create new instance everytime
const prisma = new PrismaClient();

export const fetchRecipes = async () => {
  try {
    return prisma.recipe.findMany();
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect;
  }
};
