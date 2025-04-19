"use server";

import { getLocale } from "next-intl/server";
import { slugify } from "transliteration";
import { z } from "zod";

import { recipeSchema } from "@/components/recipe-form/schemas";
import { db } from "@/db";
import { redirect } from "@/i18n/routing";
import { currentSession } from "@/lib/currentSession";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import type { FormState } from "@/types/formState";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";

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
    image,
  } = parsedData;

  const uploadedImageUrl = image
    ? (await uploadImageToCloudinary(image)).secure_url
    : null;

  const newRecipe = await db.recipe.create({
    data: {
      authorId: user.id,
      name,
      description,
      slug: slugify(name),
      images: uploadedImageUrl ? [uploadedImageUrl] : [],
      steps: steps.map(({ step }) => step),
      ingredients: {
        create: ingredients,
      },
      categoryId: parseInt(categoryId),
    },
  });

  // Return redirect, otherwise action return type complains
  return redirect({
    href: `/recipes/${newRecipe.id}/${newRecipe.slug}`,
    locale,
  });
}
