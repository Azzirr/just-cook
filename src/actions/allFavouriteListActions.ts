"use server";
import { db } from "@/db";

interface IsListExistCriteria {
  id?: number;
  name?: string;
  userId?: string;
  includeRecipes?: boolean;
}
interface ListWithRecipes {
  id: number;
  userId: string;
  recipes: { id: number }[];
}

const checkIsUserExist = async (userId: string) => {
  const isUserExist = await db.user.findFirst({
    where: { id: userId },
  });
  return isUserExist ? true : false;
};

const checkIsListExist = async (criteria: IsListExistCriteria) => {
  return await db.recipeList.findFirst({
    where: {
      ...criteria,
    },
  });
};

const getListWithRecipes = async (
  listId: number,
  userId: string,
): Promise<ListWithRecipes | null> => {
  return await db.recipeList.findFirst({
    where: { id: listId, userId },
    include: { recipes: true },
  });
};

export const getRecipeLists = async (
  userId: string,
  excludeFavouritesList: boolean,
) => {
  try {
    const recipeLists = await db.recipeList.findMany({
      where: { userId },
    });

    if (excludeFavouritesList) {
      console.log(recipeLists.slice(1));
      return recipeLists.slice(1);
    }

    return recipeLists;
  } catch (error) {
    console.log(error);
  }
};

export const createRecipeList = async (userId: string, listName: string) => {
  try {
    const isUserExist = await checkIsUserExist(userId);
    if (!isUserExist) {
      console.log("User does not exist");
      return;
    }

    const isListExist = await checkIsListExist({ name: listName, userId });

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
    const isUserExist = await checkIsUserExist(userId);
    if (!isUserExist) {
      console.log("User does not exist");
      return;
    }

    const isListExist = await checkIsListExist({ id: listId, userId });

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
  recipeId: number,
  listId?: number,
) => {
  try {
    let targetListId = listId;

    // If there is no listId argument in function, we are looking for personal Favourites list
    if (!targetListId) {
      const favouritesList = await db.recipeList.findFirst({
        where: { userId, isDefault: true },
      });

      if (!favouritesList) {
        console.log("Favourites list not found for this user");
        return;
      }

      targetListId = favouritesList.id;
    }

    const recipeList = await getListWithRecipes(targetListId, userId);

    if (!recipeList) {
      console.log("List or user not found or list does not belong to user");
      return;
    }

    const recipeExistInList = recipeList.recipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (recipeExistInList) {
      console.log("Recipe already exists in the list");
      return;
    }

    await db.recipeList.update({
      where: { id: targetListId },
      data: {
        recipes: {
          connect: { id: recipeId },
        },
      },
    });

    console.log(`Recipe added to list ${targetListId}`);
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
    const recipeList = await getListWithRecipes(listId, userId);

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
    const isUserExist = await checkIsUserExist(userId);

    if (!isUserExist) {
      console.log("User does not exist");
      return;
    }

    const recipeList = await getListWithRecipes(listId, userId);

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
