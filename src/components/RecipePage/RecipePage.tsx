"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, ListCheck, ListX, Plus } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { Ingredient } from "@/components/ShoppingBag/types";

const pizzaRecipe = {
  name: "Easy Homemade Pizza",
  author: "Sally",
  createdAt: "2013-09-01",
  updatedAt: "2022-06-10",
  description: `Follow these basic instructions for a thick, crisp, and chewy pizza crust at home. 
  The recipe yields enough pizza dough for two 12-inch pizzas and you can freeze half of the dough for later. 
  Close to 2 pounds of dough total.`,
  ingredients: [
    {
      id: 0,
      name: "Warm water",
      quantity: "320ml",
      notes: "between 38 and 46°C",
    },
    {
      id: 1,
      name: "Instant yeast",
      quantity: "7g",
      notes: "1 standard packet",
    },
    {
      id: 2,
      name: "Granulated sugar",
      quantity: "1 tablespoon",
    },
    {
      id: 3,
      name: "Olive oil",
      quantity: "2 tablespoons",
      notes: "plus more for pan and brushing on dough",
    },
    {
      id: 4,
      name: "Salt",
      quantity: "1 teaspoon",
    },
    {
      id: 5,
      name: "Unbleached all-purpose flour",
      quantity: "450g",
    },
  ],
  steps: [
    "Whisk the warm water, yeast, and granulated sugar together in the bowl of your stand mixer fitted with a dough hook or paddle attachment. Cover and allow to rest for 5 minutes",
    "Add olive oil, salt, and flour. Mix until combined.",
    "Knead the dough on a floured surface for 5 minutes.",
    "Place dough in a greased bowl, cover with a towel. Allow the dough to rise at room temperature for 60-90 minutes or until double in size",
    "Preheat oven to 246°C.",
    "Punch down dough and divide in half.",
    "Roll out dough on a floured surface to desired thickness.",
    "Place dough on a greased baking sheet or pizza pan.",
    "Top with desired toppings",
    "Bake for 13-15 minutes or until the crust is golden brown",
  ],
};

const FormSchema = z.object({
  ingredients: z.array(z.number()),
});

export const RecipePage = () => {
  const formId = useId();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: [],
    },
  });

  const selectedIngredients = form.watch("ingredients");
  const areAllIngredientsSelected =
    selectedIngredients.length === pizzaRecipe.ingredients.length;

  function onSubmit({ ingredients }: z.infer<typeof FormSchema>) {
    const shoppingBagItems = pizzaRecipe.ingredients.filter(({ id }) =>
      ingredients.includes(id),
    );

    localStorage.setItem(
      "just-cook-shopping-bag",
      JSON.stringify(shoppingBagItems),
    );

    // TODO: Show a toast message
    console.log("Added to shopping bag", shoppingBagItems);
  }

  function handleSelectAll() {
    form.setValue(
      "ingredients",
      areAllIngredientsSelected
        ? []
        : pizzaRecipe.ingredients.map((ingredient) => ingredient.id),
    );
  }

  function handleOnCheckedChange(checked: CheckedState, id: Ingredient["id"]) {
    form.setValue(
      "ingredients",
      checked
        ? [...form.getValues("ingredients"), id]
        : form.getValues("ingredients").filter((value) => value !== id),
    );
  }

  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-3 p-6">
      <section className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h1>{pizzaRecipe.name}</h1>
          <p>by {pizzaRecipe.author}</p>
        </div>
        <div className="mb-2 sm:mt-2">
          <p className="mb-1 text-sm text-muted-foreground">
            Created {pizzaRecipe.createdAt}
          </p>
          <p className="text-sm text-muted-foreground">
            Updated {pizzaRecipe.updatedAt}
          </p>
        </div>
      </section>
      <section>
        <Button
          variant="ghost"
          className="size-10 rounded-full transition-all duration-150 hover:bg-red-100 hover:text-red-500 focus-visible:bg-red-100 focus-visible:text-red-500 active:scale-110"
        >
          <Heart className="size-6" />
          <span className="sr-only">Add recipe to favorites</span>
        </Button>
      </section>
      <section>
        <p>{pizzaRecipe.description}</p>
      </section>
      <section className="mt-4">
        <h2 className="mb-3">Ingredients</h2>
        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <ul>
              {pizzaRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <FormField
                    control={form.control}
                    name="ingredients"
                    defaultValue={form.getValues("ingredients")}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex items-baseline gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(ingredient.id)}
                              onCheckedChange={(checked) =>
                                handleOnCheckedChange(checked, ingredient.id)
                              }
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-base">
                            <span className="font-semibold">
                              {ingredient.name}
                            </span>{" "}
                            - {ingredient.quantity}{" "}
                            {ingredient.notes && `(${ingredient.notes})`}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={selectedIngredients.length === 0}>
                    <Plus /> Add to shopping bag
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add ingredients to shopping bag</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to add the selected ingredients to
                      the shopping bag?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" form={formId}>
                        Add items
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button type="button" onClick={handleSelectAll}>
                {areAllIngredientsSelected ? (
                  <>
                    <ListX /> Deselect all
                  </>
                ) : (
                  <>
                    <ListCheck /> Select all
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <section className="mt-4">
        <h2 className="mb-3">Steps</h2>
        <ol className="list-inside list-decimal marker:text-lg marker:font-bold">
          {pizzaRecipe.steps.map((step, index) => (
            <li key={index} className="mb-2 pl-5 -indent-5">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
