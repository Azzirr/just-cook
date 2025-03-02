"use server";

import { db } from "@/db";

type GetRecipesOptions = {
  authorId: string;
  limit?: number;
};

export const getRecipes = async (options: GetRecipesOptions) => {
  const { authorId, limit } = options;

  try {
    const recipes = await db.recipe.findMany({
      where: {
        authorId,
      },
      ...(limit ? { take: limit } : {}),
    });
    return recipes;
  } catch (e) {
    return null;
  }
};
