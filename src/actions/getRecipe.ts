"use server";

import { db } from "@/db";
import { Ingredient, Recipe, User } from "@prisma/client";

export type RecipeWithAuthor = Recipe & {
  author: User;
  ingredients: Ingredient[];
};

export async function getRecipe(id: number): Promise<RecipeWithAuthor> {
  const recipe = await db.recipe.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      ingredients: true,
    },
  });

  return recipe as RecipeWithAuthor;
}
