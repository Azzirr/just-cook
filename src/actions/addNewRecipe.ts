"use server";
import { FormState } from "@/types/formState";
import { db } from "@/db";
import { recipeSchema } from "@/components/recipe-form/schemas";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { currentSessionUser } from "@/lib/currentSessionUser";

export async function addNewRecipe(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const locale = await getLocale();
  const formData = formDataToNestedObject(data);

  const parsed = recipeSchema.safeParse(formData);
  const user = await currentSessionUser();

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

  const newRecipe = await db.recipe.create({
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

  redirect({
    href: `/category/${categoryId}/${newRecipe.id}`,
    locale,
  });

  return {
    isSuccess: true,
  };
}
