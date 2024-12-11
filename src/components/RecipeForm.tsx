"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const recipeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Recipe name must be at least 2 characters" }),
  category: z.string(),
  description: z.string(),
  ingredients: z
    .array(
      z.string().min(1, { message: "Ingredient must be at least 1 character" }),
    )
    .min(1, { message: "At least one ingredient is required" }),
  steps: z
    .array(
      z.string().min(1, {
        message: "Step must be at least 1 character",
      }),
    )
    .min(1, { message: "At least one step is required" }),
  tags: z.array(z.string()).optional(),
});

export const RecipeForm = () => {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      ingredients: [],
      steps: [],
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-96 gap-4"
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
              <FormDescription>This is your recipe name</FormDescription>
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
              <FormDescription>Select recipe category</FormDescription>
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
              <FormDescription>
                Describe your recipe in a few words
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Steps</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide steps to make the recipe"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide steps to make the recipe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
