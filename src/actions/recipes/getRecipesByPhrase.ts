"use server";

import { db } from "@/db";

type GetRecipesByPhrase = {
  phrase: string;
  limit?: number;
};

export const getRecipesByPhrase = async ({
  phrase,
  limit = 10,
}: GetRecipesByPhrase) => {
  const result = await db.recipe.findMany({
    where: {
      name: {
        contains: phrase.trim(),
        mode: "insensitive",
      },
    },
    take: limit,
  });
  return result || [];
};
