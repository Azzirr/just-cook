"use server";

import { db } from "@/db";
import type { Recipe } from "@prisma/client";

export async function getRecipe(slug: Recipe["slug"]) {
  try {
    return await db.recipe.findUnique({
      where: { slug },
      include: {
        author: true,
        ingredients: true,
      },
    });
  } catch (e) {
    return null;
  }
}
