// "use server";
// import { auth } from "@/auth";
// import { db } from "@/db";
// import { Recipe, RecipeList } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// type QueryFiltersCriteria = Partial<{
//   id: RecipeList["id"];
//   name: RecipeList["name"];
//   userId: RecipeList["userId"];
//   includeRecipes: boolean;
// }>;

// type ListWithRecipes = {
//   id: RecipeList["id"];
//   recipes: Recipe[];
// };

// export async function getCurrentUserId() {
//   const session = await auth();
//   return session?.user?.id;
// }

// const recipeListExist = async (criteria: QueryFiltersCriteria) => {
//   return await db.recipeList.findFirst({
//     where: {
//       ...criteria,
//     },
//   });
// };

// const getListWithRecipes = async (
//   listId: RecipeList["id"],
//   userId: RecipeList["userId"] | undefined,
// ): Promise<ListWithRecipes | null> => {
//   return db.recipeList.findFirst({
//     where: { id: listId, userId },
//     include: { recipes: true },
//   });
// };

// export const getRecipeLists = async (excludeFavouritesList: boolean) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return [];
//     }

//     const recipeLists = await db.recipeList.findMany({
//       where: {
//         userId,
//         NOT: excludeFavouritesList ? { isSystem: true } : undefined,
//       },
//     });

//     return recipeLists;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const createRecipeList = async (listName: RecipeList["name"]) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return null;
//     }

//     const isListExist = await recipeListExist({ name: listName, userId });

//     if (isListExist) {
//       console.log("There is a list of this name");
//       return null;
//     }

//     const newList = await db.recipeList.create({
//       data: {
//         name: listName,
//         userId,
//       },
//     });

//     console.log("New list created:", newList);
//     revalidatePath("/favourite-recipes");
//     return newList;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// export const deleteRecipeList = async (listId: RecipeList["id"]) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return;
//     }

//     const isListExist = await recipeListExist({ id: listId, userId });

//     if (!isListExist) {
//       console.log("List not found");
//       return;
//     }

//     await db.recipeList.delete({
//       where: { id: listId },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addRecipeToList = async (
//   recipeId: Recipe["id"],
//   listId?: RecipeList["id"],
// ) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return;
//     }

//     let targetListId = listId;

//     // If there is no listId argument in function, we are looking for personal Favourites list
//     if (!targetListId) {
//       const favouritesList = await db.recipeList.findFirst({
//         where: { userId, isSystem: true },
//       });

//       targetListId = favouritesList!.id;
//     }

//     const recipeList = await db.recipeList.findFirst({
//       where: {
//         id: targetListId,
//         userId,
//         recipes: {
//           none: { id: recipeId },
//         },
//       },
//       include: { recipes: true },
//     });

//     if (!recipeList) {
//       console.log("Recipe already exist on this list");
//       return;
//     }

//     await db.recipeList.update({
//       where: { id: targetListId },
//       data: {
//         recipes: {
//           connect: { id: recipeId },
//         },
//       },
//     });

//     console.log(`Recipe added to list ${targetListId}`);
//   } catch (error) {
//     console.log("Error with adding recipe to list", error);
//   }
// };

// export const removeRecipeFromList = async (
//   listId: RecipeList["id"],
//   recipeId: Recipe["id"],
// ) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return;
//     }

//     await db.recipeList.update({
//       where: {
//         id: listId,
//         userId,
//         recipes: {
//           some: { id: recipeId },
//         },
//       },
//       data: {
//         recipes: {
//           disconnect: { id: recipeId },
//         },
//       },
//     });

//     console.log("Recipe deleted from the list");
//   } catch (error) {
//     console.log("Error with removing recipe from the list", error);
//   }
// };

// export const getRecipesFromList = async (listId?: RecipeList["id"]) => {
//   try {
//     const userId = await getCurrentUserId();
//     if (!userId) {
//       console.log("User does not exist");
//       return null;
//     }

//     let recipeList;
//     if (listId) {
//       recipeList = await getListWithRecipes(listId, userId);
//     } else {
//       recipeList = await db.recipeList.findFirst({
//         where: {
//           userId,
//           isSystem: true,
//         },
//         include: { recipes: true },
//       });
//     }

//     if (!recipeList) {
//       console.log("List not found or list does not belong to the user");
//       return [];
//     }

//     return recipeList.recipes ?? [];
//   } catch (error) {
//     console.log("Error with reading the list", error);
//     return [];
//   }
// };
