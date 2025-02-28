"use server";
import { db } from "@/db";
import type { Recipe, RecipeCategory } from "@prisma/client";

export const getCategories = async (): Promise<RecipeCategory[]> => {
  try {
    return await db.recipeCategory.findMany();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategoryRecipes = async (
  categorySlug: RecipeCategory["slug"],
): Promise<Recipe[]> => {
  try {
    return await db.recipe.findMany({
      where: {
        category: { slug: categorySlug },
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
