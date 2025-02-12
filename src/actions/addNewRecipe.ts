"use server";
import { FormState } from "@/types/formState";
import { db } from "@/db";
import { recipeSchema } from "@/components/recipe-form/schemas";
import { currentUser } from "@/lib/currentUser";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function addNewRecipe(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const locale = await getLocale();
  const user = await currentUser();
  const formData = formDataToNestedObject(data);
  const parsed = recipeSchema.safeParse(formData);

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

  const newRecipe = await db.recipe.create({
    data: {
      authorId: user.id,
      name,
      description,
      steps: steps.map(({ step }) => step),
      ingredients: {
        create: ingredients,
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
