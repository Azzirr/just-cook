"use server";

import { db } from "@/db";

export const getCategories = async () => {
  try {
    return await db.recipeCategory.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRecipesByCategory = async (categoryId: number) => {
  try {
    return await db.recipe.findMany({
      where: {
        recipeCategoryId: categoryId,
      },
    });
  } catch (error) {
    console.log("error");
  }
};
