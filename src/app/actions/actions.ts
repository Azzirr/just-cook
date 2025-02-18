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
      select: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return;
    }

    if (!user.favouriteRecipes.includes(recipeId)) {
      await db.user.update({
        where: { id: userId },
        data: {
          favouriteRecipes: {
            push: recipeId,
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
      select: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return;
    }

    if (user.favouriteRecipes.includes(recipeId)) {
      await db.user.update({
        where: { id: userId },
        data: {
          favouriteRecipes: {
            set: user.favouriteRecipes.filter((id) => id !== recipeId),
          },
        },
      });
      console.log("Recipe removed");
    } else console.log("Error");
  } catch (error) {
    console.log(error);
  }
};

export const getFavouriteRecipes = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        favouriteRecipes: true,
      },
    });

    if (!user) {
      console.log("User does not exist");
      return [];
    }

    const favouriteRecipes = await db.recipe.findMany({
      where: {
        id: { in: user.favouriteRecipes },
      },
    });

    console.log(favouriteRecipes);
    return favouriteRecipes || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
