"use server";

import { db } from "@/db";

export async function getRecipe(id: number) {
  try {
    const recipe = await db.recipe.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        ingredients: true,
      },
    });

    return recipe;
  } catch (e) {
    return null;
  }
}
