"use server";

import { db } from "@/db";

type GetRecipes = {
  limit?: number;
};

export const getRecipes = async ({ limit = 10 }: GetRecipes = {}) => {
  try {
    const recipes = await db.recipe.findMany({ take: limit });
    return recipes || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return []; // or throw error if you want it to propagate
  }
};
