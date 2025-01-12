"use server";
import { db } from "@/db";

export const fetchCategories = async () => {
  try {
    return db.recipeCategory.findMany();
  } catch (error) {
    console.log(error);
  }
};
// TODO - to delete, but I left it for now
// export const fetchRecipes = async () => {
//   try {
//     return db.recipe.findMany();
//   } catch (error) {
//     console.log(error);
//   }
// };

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
