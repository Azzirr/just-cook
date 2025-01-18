"use server";
import { FormState } from "@/types/formState";
import { extractFieldsFromFormData } from "@/utils/extractFieldsFromFormData";
import { db } from "@/db";
import { recipeSchema } from "@/components/recipe-form/schemas";
import { currentUser } from "@/lib/currentUser";

export async function addNewRecipe(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const parsed = recipeSchema.safeParse(data);
  const user = await currentUser();

  if (!user?.id) {
    return {
      message: "Unauthorized",
      isSuccess: false,
    };
  }

  if (!parsed.success) {
    return {
      errors: parsed.error?.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const {
    name,
    category: categoryId,
    description,
    ingredients,
    steps,
  } = parsed.data;

  const parsedSteps = steps.map(({ step }) => step);

  await db.recipe.create({
    data: {
      authorId: user.id,
      name,
      description,
      steps: parsedSteps,
      ingredients: {
        create: ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
        })),
      },
      recipeCategoryId: Number(categoryId),
    },
  });

  return {
    isSuccess: true,
  };
}
