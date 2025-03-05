"use server";
import { auth } from "@/auth";
import { db } from "@/db";

type QueryFiltersCriteria = {
  id?: number;
  name?: string;
  userId?: string;
  includeRecipes?: boolean;
};
type ListWithRecipes = {
  id: number;
  recipes: { id: number }[];
};

export async function getCurrentUserId() {
  const session = await auth();
  return session?.user?.id;
}

const recipeListExist = async (criteria: QueryFiltersCriteria) => {
  return await db.recipeList.findFirst({
    where: {
      ...criteria,
    },
  });
};

const getListWithRecipes = async (
  listId: number,
  userId: string | undefined,
): Promise<ListWithRecipes | null> => {
  return await db.recipeList.findFirst({
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
      where: { userId },
    });

    if (excludeFavouritesList) {
      return recipeLists.slice(1);
    }

    return recipeLists;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createRecipeList = async (listName: string) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return null;
    }

    const isListExist = await recipeListExist({ name: listName, userId });

    if (isListExist) {
      console.log("There is a list of this name");
      return null;
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
    return null;
  }
};

export const deleteRecipeList = async (listId: number) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    const isListExist = await recipeListExist({ id: listId, userId });

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

export const addRecipeToList = async (recipeId: number, listId?: number) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    let targetListId = listId;

    // If there is no listId argument in function, we are looking for personal Favourites list
    if (!targetListId) {
      const favouritesList = await db.recipeList.findFirst({
        where: { userId, isDefault: true },
      });

      targetListId = favouritesList!.id;
    }

    const recipeList = await getListWithRecipes(targetListId, userId);

    if (!recipeList) {
      console.log("List not found or list not belong to user");
      return;
    }

    const recipeExistInList = recipeList.recipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (recipeExistInList) {
      console.log("Recipe already exist on this list");
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
    console.log("Error with adding recipe to list", error);
  }
};

export const removeRecipeFromList = async (
  listId: number,
  recipeId: number,
) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return;
    }

    const recipeList = await getListWithRecipes(listId, userId);

    if (!recipeList) {
      console.log("List not found or list not belong to user");
      return;
    }

    const recipeExistInList = recipeList.recipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (!recipeExistInList) {
      console.log("Recipe already exist on this list");
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

    console.log("Recipe deleted from the list");
  } catch (error) {
    console.log("Error with removing recipe from the list", error);
  }
};

export const getRecipesFromList = async (listId: number) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("User does not exist");
      return null;
    }

    const recipeList = await getListWithRecipes(listId, userId);

    if (!recipeList) {
      console.log("List not found or list not belong to user");
      return null;
    }

    return recipeList;
  } catch (error) {
    console.log("Error with reading the list", error);
    return null;
  }
};
