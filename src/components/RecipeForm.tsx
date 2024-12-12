"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const recipeSchema = z.object({
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
  tags: z.array(z.string()).optional(),
});

export function RecipeForm() {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      ingredients: [{ name: "", quantity: "" }],
      steps: [{ step: "" }],
      tags: [],
    },
  });

  const {
    fields: steps,
    append: addStep,
    remove: removeStep,
  } = useFieldArray<z.infer<typeof recipeSchema>>({
    control: form.control,
    name: "steps",
  });

  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray<z.infer<typeof recipeSchema>>({
    control: form.control,
    name: "ingredients",
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipe category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="main-dish">Main dish</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your recipe in a few words"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p>Ingredients</p>
        {ingredients.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="shrink-0 basis-[55%]">
                  <FormControl>
                    <Input placeholder="Ingredient" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                className="p-3"
                onClick={() => removeIngredient(index)}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          className="self-end p-3"
          onClick={() => addIngredient({ name: "", quantity: "" })}
        >
          <Plus />
        </Button>

        <p>Steps</p>
        {steps.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`steps.${index}.step`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="text-base">{index + 1}.</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the step" {...field} />
                  </FormControl>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="p-3"
                      onClick={() => removeStep(index)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          className="self-end p-3"
          onClick={() => addStep({ step: "" })}
        >
          <Plus />
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
