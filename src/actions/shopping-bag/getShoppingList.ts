"use server";

import type { Ingredient } from "@prisma/client";

import { db } from "@/db";

type GetShoppingList = { userId: string };

export const getShoppingList = async ({
  userId,
}: GetShoppingList): Promise<Ingredient[]> => {
  try {
    const userShoppingList = await db.user
      .findUnique({ where: { id: userId } })
      .shoppingList();

    if (!userShoppingList) {
      throw new Error("Shopping list not found");
    }

    return userShoppingList;
  } catch {
    return [];
  }
};
