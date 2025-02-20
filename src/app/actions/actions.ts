"use server";
import { db } from "@/db";

export const fetchCategories = async () => {
  try {
    return db.recipeCategory.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipesByCategory = async (categoryId: number) => {
  try {
    return await db.recipe.findMany({
      where: {
        recipeCategoryId: categoryId,
      },
    });
  } catch (error) {
    console.log("error");
  }
};
/////

export const createRecipeList = async (userId: string, listName: string) => {
  try {
    const userExist = await db.user.findFirst({
      where: { id: userId },
    });

    if (!userExist) {
      console.log("User does not exist");
      return;
    }

    const isListExist = await db.recipeList.findFirst({
      where: {
        name: listName,
        userId,
      },
    });

    if (isListExist) {
      console.log("List with this name already exist");
      return;
    }

    const newList = await db.recipeList.create({
      data: {
        name: listName,
        userId,
      },
    });

    console.log("New list created:", newList);
    return newList;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipeList = async (userId: string, listId: number) => {
  try {
    const userExist = await db.user.findFirst({
      where: { id: userId },
    });

    if (!userExist) {
      console.log("User does not exist");
      return;
    }

    const isListExist = await db.recipeList.findFirst({
      where: {
        id: listId,
        userId,
      },
    });

    if (!isListExist) {
      console.log("List not found");
      return;
    }

    await db.recipeList.delete({
      where: { id: listId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRecipeToList = async (
  userId: string,
  listId: number,
  recipeId: number,
) => {
  try {
    const recipeList = await db.recipeList.findFirst({
      where: { id: listId, userId },
      include: { recipes: true },
    });

    if (!recipeList) {
      console.log("List or user not found or list does not belong to user");
      return;
    }

    const recipeExistInList = recipeList.recipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (recipeExistInList) {
      console.log("List found, but recipe already exist in the list");
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
    console.log("Recipe added to the list");
  } catch (error) {
    console.log("Error adding recipe to list", error);
  }
};

export const removeRecipeFromList = async (
  userId: string,
  listId: number,
  recipeId: number,
) => {
  try {
    const recipeList = await db.recipeList.findFirst({
      where: { id: listId, userId },
      include: { recipes: true },
    });

    if (!recipeList) {
      console.log("List or user not found or list does not belong to user");
      return;
    }

    const recipeExistInList = recipeList.recipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (!recipeExistInList) {
      console.log("List found, but recipe not found in the list");
      return;
    }

    await db.recipeList.update({
      where: { id: listId },
      data: {
        recipes: {
          disconnect: { id: recipeId },
        },
      },
    });

    console.log("Recipe removed from list");
  } catch (error) {
    console.log("Error removing recipe from list", error);
  }
};

export const getRecipesFromList = async (userId: string, listId: number) => {
  try {
    const userExist = await db.user.findFirst({
      where: { id: userId },
    });
    if (!userExist) {
      console.log("User does not exist");
      return;
    }

    const recipeList = await db.recipeList.findFirst({
      where: { id: listId, userId },
      include: {
        recipes: true,
      },
    });

    if (!recipeList) {
      console.log("List or user not found or list does not belong to user");
      return;
    }
    console.log(recipeList);
    return recipeList || [];
  } catch (error) {
    console.log("Error with reading list", error);
  }
};
