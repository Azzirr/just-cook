"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchRecipes = async () => {
  try {
    return prisma.recipe.findMany();
  } catch (error) {
    //TODO: Add some kind of toast maybe?
    alert(error);
  } finally {
    prisma.$disconnect;
  }
};
