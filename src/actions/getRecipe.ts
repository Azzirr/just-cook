"use server";

import { db } from "@/db";
import type { Recipe } from "@prisma/client";

export async function getRecipe(id: Recipe["id"]) {
  try {
    return await db.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: true,
      },
    });
  } catch (e) {
    return null;
  }
}
