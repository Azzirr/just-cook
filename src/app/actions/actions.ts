"use server";
import { db } from "@/db";
import type { Recipe, RecipeCategory } from "@prisma/client";

export const fetchCategories = async () => {
  try {
    return db.recipeCategory.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipesByCategory = async (
  categorySlug: RecipeCategory["slug"],
): Promise<Recipe[]> => {
  return db.recipe.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
  });
};
