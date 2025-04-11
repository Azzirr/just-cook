"use server";
import { db } from "@/db";
import { RecipeList } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { recipeListExist } from "./queries";
import { getCurrentUserId } from "./auth-utils";

export const createRecipeList = async (listName: RecipeList["name"]) => {
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
    revalidatePath("/favourite-recipes");
    return newList;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteRecipeList = async (listId: RecipeList["id"]) => {
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
