"use server";
import { db } from "@/db";
import { Recipe, RecipeList } from "@prisma/client";
import { getCurrentUserId } from "./auth-utils";

type QueryFiltersCriteria = Partial<{
  id: RecipeList["id"];
  name: RecipeList["name"];
  userId: RecipeList["userId"];
  includeRecipes: boolean;
}>;

type ListWithRecipes = {
  id: RecipeList["id"];
  recipes: Recipe[];
};

export const recipeListExist = async (criteria: QueryFiltersCriteria) => {
  return await db.recipeList.findFirst({
    where: {
      ...criteria,
    },
  });
};

export const getListWithRecipes = async (
  listId: RecipeList["id"],
  userId: RecipeList["userId"] | undefined,
): Promise<ListWithRecipes | null> => {
  return db.recipeList.findFirst({
    where: { id: listId, userId },
    include: { recipes: true },
  });
};

export const getRecipeLists = async (excludeFavouritesList: boolean) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return [];
    }

    const recipeLists = await db.recipeList.findMany({
      where: {
        userId,
        NOT: excludeFavouritesList ? { isSystem: true } : undefined,
      },
    });

    return recipeLists;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRecipesFromList = async (listId?: RecipeList["id"]) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return null;
    }

    let recipeList;
    if (listId) {
      recipeList = await getListWithRecipes(listId, userId);
    } else {
      recipeList = await db.recipeList.findFirst({
        where: {
          userId,
          isSystem: true,
        },
        include: { recipes: true },
      });
    }

    if (!recipeList) {
      console.log("List not found or list does not belong to the user");
      return [];
    }

    return recipeList.recipes ?? [];
  } catch (error) {
    console.log("Error with reading the list", error);
    return [];
  }
};
