"use server";
import { db } from "@/db";
import { Recipe, RecipeList } from "@prisma/client";
import { getCurrentUserId } from "./auth-utils";

export const addRecipeToList = async (
  recipeId: Recipe["id"],
  listId: RecipeList["id"],
) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    const recipeList = await db.recipeList.findFirst({
      where: {
        id: listId,
        userId,
        recipes: {
          none: { id: recipeId },
        },
      },
      include: { recipes: true },
    });

    if (!recipeList) {
      console.log("Recipe already exist on this list or list not found");
      return;
    }

    await db.recipeList.update({
      where: { id: listId },
      data: {
        recipes: {
          connect: { id: recipeId },
        },
      },
    });

    console.log(`Recipe added to list ${listId}`);
  } catch (error) {
    console.log("Error with adding recipe to list", error);
  }
};

export const addRecipeToFavouriteList = async (recipeId: Recipe["id"]) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    const favouritesList = await db.recipeList.findFirst({
      where: {
        userId,
        isSystem: true,
      },
    });

    if (!favouritesList) {
      console.log("Favourites list not found");
      return;
    }

    const isRecipeInList = await db.recipeList.findFirst({
      where: {
        id: favouritesList.id,
        recipes: {
          some: { id: recipeId },
        },
      },
    });

    if (isRecipeInList) {
      console.log("Recipe already exists in Favourites");
      return;
    }

    await db.recipeList.update({
      where: { id: favouritesList.id },
      data: {
        recipes: {
          connect: { id: recipeId },
        },
      },
    });

    console.log(`Recipe added to Favourites`);
  } catch (error) {
    console.log("Error with adding recipe to Favourites", error);
  }
};

export const removeRecipeFromList = async (
  listId: RecipeList["id"],
  recipeId: Recipe["id"],
) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    await db.recipeList.update({
      where: {
        id: listId,
        userId,
        recipes: {
          some: { id: recipeId },
        },
      },
      data: {
        recipes: {
          disconnect: { id: recipeId },
        },
      },
    });

    console.log("Recipe deleted from the list");
  } catch (error) {
    console.log("Error with removing recipe from the list", error);
  }
};
