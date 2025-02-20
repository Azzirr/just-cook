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

export const addRecipeToFavourites = async (
  userId: string,
  recipeId: number,
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return;
    }

    const isAlreadyFavourite = user.favouriteRecipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (!isAlreadyFavourite) {
      await db.user.update({
        where: { id: userId },
        data: {
          favouriteRecipes: {
            connect: { id: recipeId },
          },
        },
      });
      console.log("Recipe added");
    } else console.log("Recipe is already in favourites");
  } catch (error) {
    console.log(error);
  }
};

export const removeRecipeFromFavourites = async (
  userId: string,
  recipeId: number,
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return;
    }

    const isAlreadyFavourite = user.favouriteRecipes.some(
      (recipe) => recipe.id === recipeId,
    );

    if (isAlreadyFavourite) {
      await db.user.update({
        where: { id: userId },
        data: {
          favouriteRecipes: {
            disconnect: { id: recipeId },
          },
        },
      });
      console.log("Recipe removed from favourites");
    } else console.log("Recipe is not in favourites");
  } catch (error) {
    console.log(error);
  }
};

export const getFavouriteRecipes = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return [];
    }

    console.log(user.favouriteRecipes);
    return user.favouriteRecipes || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
