import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(2, { message: "Recipe name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: "Ingredient name is required",
        }),
        quantity: z.string().min(1, {
          message: "Quantity is required",
        }),
      }),
    )
    .min(1, { message: "At least one ingredient is required" }),
  steps: z
    .array(
      z.object({
        step: z.string().min(1, {
          message: "Step description is required",
        }),
      }),
    )
    .min(1, { message: "At least one step is required" }),
});

export type Recipe = z.infer<typeof recipeSchema>;
