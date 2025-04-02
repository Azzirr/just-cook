"use server";

import { db } from "@/db";

type GetRecipes = {
  limit?: number;
};

export const getRecipes = async ({ limit = 10 }: GetRecipes = {}) => {
  try {
    const recipes = await db.recipe.findMany({ take: limit });
    return recipes;
  } catch {
    return null;
  }
};
