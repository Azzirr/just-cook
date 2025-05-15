"use server";

import type { Recipe } from "@prisma/client";

import { db } from "@/db";

export async function getRecipe(id: Recipe["id"]) {
  try {
    return await db.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: true,
        category: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}
