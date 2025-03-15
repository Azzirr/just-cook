"use server";

import { db } from "@/db";

type GetRecipes = {
  authorId: string;
  limit?: number;
};

export const getUserRecipes = async ({ authorId, limit }: GetRecipes) => {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        authorId,
      },
      ...(limit ? { take: limit } : {}),
    });
    return recipes;
  } catch {
    return null;
  }
};
