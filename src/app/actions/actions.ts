"use server";
import { db } from "@/db";

export const fetchRecipes = async () => {
  try {
    return db.recipe.findMany();
  } catch (error) {
    console.log(error);
  } finally {
    db.$disconnect;
  }
};
