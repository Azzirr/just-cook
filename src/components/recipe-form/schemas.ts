import { z } from "zod";

import { unitTuple } from "@/utils/ingredientUnits";

export const recipeSchema = z.object({
  name: z.string().min(2, { message: "Recipe name is required" }).max(100, {
    message: "Recipe name must be less than 100 characters long",
  }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().max(500, {
    message: "Description must be less than 500 characters long",
  }),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: "Ingredient name is required",
        }),
        quantity: z.coerce
          .number()
          .min(0.01, { message: "Quantity must be greater than 0" }),
        unit: z.enum(unitTuple),
      }),
    )
    .min(1, { message: "At least one ingredient is required" }),
  steps: z
    .array(
      z.object({
        step: z
          .string()
          .min(1, {
            message: "Step description is required",
          })
          .max(250, {
            message: "Step description must be less than 250 characters long",
          }),
      }),
    )
    .min(1, { message: "At least one step is required" }),
});

export type Recipe = z.infer<typeof recipeSchema>;
