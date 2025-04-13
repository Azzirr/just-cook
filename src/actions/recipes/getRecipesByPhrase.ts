"use server";

import { db } from "@/db";

type GetRecipesByPhrase = {
  searchPhrase: string;
  limit?: number;
};

export const getRecipesByPhrase = async ({
  searchPhrase,
  limit = 10,
}: GetRecipesByPhrase) => {
  const result = await db.recipe.findMany({
    where: {
      name: {
        contains: searchPhrase.trim(),
        mode: "insensitive",
      },
    },
    take: limit,
  });
  return result || [];
};
