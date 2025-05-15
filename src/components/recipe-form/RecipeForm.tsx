"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeCategory, Unit } from "@prisma/client";
import { type Recipe as RecipeType, Ingredient } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import { useActionState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { addNewRecipe } from "@/actions/recipes/addNewRecipe";
import { editRecipe } from "@/actions/recipes/editRecipe";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatUnit, unitTuple } from "@/utils/ingredientUnits";
import { onSubmitUtil } from "@/utils/onSubmitUtil";

import { FormAlert } from "../FormAlert";

import { recipeSchema, type Recipe } from "./schemas";

type RecipeProps = {
  categories: RecipeCategory[];
  isEditing?: boolean;
  recipe?: RecipeType & { ingredients: Ingredient[] };
};

export const RecipeForm = ({
  categories,
  isEditing = false,
  recipe,
}: RecipeProps) => {
  const submitAction = isEditing ? editRecipe : addNewRecipe;
  const [state, action, isPending] = useActionState(submitAction, {
    isSuccess: false,
  });

  const defaultIngredient = { name: "", quantity: 0, unit: Unit.GRAM };

  const form = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      id: recipe?.id || "",
      name: recipe?.name || "",
      category: String(recipe?.categoryId) || "",
      description: recipe?.description || "",
      ingredients: recipe?.ingredients || [defaultIngredient],
      steps: recipe?.steps.map((step) => ({ step: step })) || [{ step: "" }],
    },
  });

  const {
    fields: steps,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  return (
    <Form {...form}>
      <form
        action={action}
        onSubmit={onSubmitUtil(action, form)}
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
          name="image"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image of dish</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(file);
                  }}
                />
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipe category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name={field.name} value={field.value} />
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
                    <Input
                      type="number"
                      placeholder="Quantity"
                      {...field}
                      step={0.01}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.unit`}
              render={({ field }) => (
                <FormItem className="grow">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unitTuple.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {formatUnit(unit, "short")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                disabled={isPending}
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
          disabled={isPending}
          type="button"
          className="self-end p-3"
          onClick={() => addIngredient(defaultIngredient)}
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
                      disabled={isPending}
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
          disabled={isPending}
          type="button"
          className="self-end p-3"
          onClick={() => addStep({ step: "" })}
        >
          <Plus />
        </Button>
        <FormAlert errors={state.errors} message={state.message} />
        <Button isPending={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
