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
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export async function editRecipe(
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
    id,
    name,
    category: categoryId,
    description,
    ingredients,
    steps,
    image,
  } = parsedData;

  const slug = slugify(name);

  if (!id) {
    return {
      message: "Recipe ID is required for editing",
      isSuccess: false,
    };
  }

  const existingRecipe = await db.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  });

  if (!existingRecipe) {
    return {
      message: "Recipe not found",
      isSuccess: false,
    };
  }

  if (existingRecipe.authorId !== user.id) {
    return {
      message: "You can only edit your own recipes",
      isSuccess: false,
    };
  }

  const uploadedImageUrl = image
    ? (await uploadImageToCloudinary(image)).secure_url
    : null;

  const existingIngredientIds = existingRecipe.ingredients.map(
    (ingredient) => ingredient.id,
  );
  const submittedIngredientIds = ingredients.map(
    (ingredient) => ingredient?.id,
  );

  const ingredientIdsToDelete = existingIngredientIds.filter(
    (id) => !submittedIngredientIds.includes(id),
  );

  await db.$transaction([
    db.recipe.update({
      where: { id },
      data: {
        name,
        description,
        slug: slug,
        images: uploadedImageUrl
          ? [uploadedImageUrl, ...(existingRecipe.images || [])]
          : existingRecipe.images,
        steps: steps.map(({ step }) => step),
        categoryId: parseInt(categoryId),
      },
    }),
    ...ingredients.map((ingredient) => {
      const isNew = !ingredient.id;
      return isNew
        ? db.ingredient.create({
            data: {
              name: ingredient.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              recipeId: id,
            },
          })
        : db.ingredient.update({
            where: { id: ingredient.id },
            data: {
              name: ingredient.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              recipeId: id,
            },
          });
    }),
    db.ingredient.deleteMany({
      where: {
        recipeId: id,
        id: { in: ingredientIdsToDelete },
      },
    }),
  ]);

  return redirect({
    href: `/recipes/${id}/${slug}`,
    locale,
  });
}
