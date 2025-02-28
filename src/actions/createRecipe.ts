"use server";

import { z } from "zod";
import { getLocale } from "next-intl/server";
import { slugify } from "transliteration";

import { db } from "@/db";
import { recipeSchema } from "@/components/recipe-form/schemas";
import { redirect } from "@/i18n/routing";
import { currentSession } from "@/lib/currentSession";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";
import type { FormState } from "@/types/formState";

export async function createRecipe(
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

  const { name, category, description, ingredients, steps } = parsedData;

  const newRecipe = await db.recipe.create({
    data: {
      authorId: user.id,
      name,
      description,
      slug: slugify(name),
      steps: steps.map(({ step }) => step),
      ingredients: {
        create: ingredients,
      },
      categoryId: parseInt(category),
    },
  });

  // Return redirect, otherwise action return type complains
  return redirect({
    href: `/recipes/${newRecipe.id}/${newRecipe.slug}`,
    locale,
  });
}
