"use server";

import { Recipe } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { currentSession } from "@/lib/currentSession";
import { commentSchema } from "@/schemas/commentSchema";
import type { FormState } from "@/types/formState";
import { formDataToNestedObject } from "@/utils/formDataToNestedObject";

export const createRecipeComment = async (
  recipeId: Recipe["id"],
  prevState: FormState,
  data: FormData | z.infer<typeof commentSchema>,
): Promise<FormState> => {
  const user = await currentSession();
  const {
    data: parsedData,
    success,
    error,
  } = commentSchema.safeParse(
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

  const { comment } = parsedData;

  const updatedRecipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      comments: {
        create: {
          text: comment,
          authorId: user.id,
        },
      },
    },
  });

  revalidatePath(`/recipes/${updatedRecipe.id}/${updatedRecipe.slug}`);

  return {
    isSuccess: true,
  };
};
