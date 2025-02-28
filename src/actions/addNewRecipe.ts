"use server";

import { FormState } from "@/types/formState";
import { db } from "@/db";
import { recipeSchema } from "@/components/recipe-form/schemas";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { currentSession } from "@/lib/currentSession";
import { z } from "zod";
import { slugify } from "@/utils/slugify";

export async function addNewRecipe(
  prevState: FormState,
  data: FormData | z.infer<typeof recipeSchema>,
): Promise<FormState> {
  const locale = await getLocale();
  const user = await currentSession();

  const {
    data: parsedData,
    success,
    error,
  } = recipeSchema.safeParse(
    data instanceof FormData ? formDataToNestedObject(data) : data,
  );

  if (!user?.id) {
    return {
      message: "Unauthorized",
      isSuccess: false,
    };
  }

  if (!success) {
    return {
      errors: error.errors.map((error) => error.message),
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
  } = parsedData;

  const category = await db.recipeCategory.findUnique({
    where: {
      id: parseInt(categoryId),
    },
  });

  if (!category) {
    return {
      message: "Category not found",
      isSuccess: false,
    };
  }

  const newRecipe = await db.recipe.create({
    data: {
      authorId: user.id,
      name,
      slug: slugify(name),
      description,
      steps: steps.map(({ step }) => step),
      ingredients: {
        create: ingredients,
      },
      recipeCategoryId: category.id,
    },
  });

  redirect({
    href: `/recipes/${newRecipe.slug}`,
    locale,
  });

  return {
    isSuccess: true,
  };
}
