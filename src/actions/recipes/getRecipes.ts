"use server";

import { db } from "@/db";

type GetRecipes = {
  limit?: number;
};

export const getRecipes = async ({ limit = 10 }: GetRecipes = {}) => {
  const recipes = await db.recipe.findMany({ take: limit });
  return recipes || [];
};
