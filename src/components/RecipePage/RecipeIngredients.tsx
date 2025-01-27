"use client";

import { useId } from "react";
import { useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, ListX, ListCheck } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import type { Ingredient } from "@/components/ShoppingBag/types";

const FormSchema = z.object({
  ingredientIds: z.array(z.number()),
});

type Props = {
  ingredients: Ingredient[];
};

export const RecipeIngredients = ({ ingredients }: Props) => {
  const formId = useId();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const selectedIngredients = form.watch("ingredientIds", []);
  const areAllIngredientsSelected =
    selectedIngredients.length === ingredients.length;

  function onSubmit({ ingredientIds }: z.infer<typeof FormSchema>) {
    const newShoppingBagItems = ingredients.filter(({ id }) =>
      ingredientIds.includes(id),
    );

    try {
      const currentShoppingBagItems = JSON.parse(
        localStorage.getItem("just-cook-shopping-bag") ?? "[]",
      );

      localStorage.setItem(
        "just-cook-shopping-bag",
        JSON.stringify([...currentShoppingBagItems, ...newShoppingBagItems]),
      );

      toast.success("Successfully added items!", {
        description: "Selected ingredients have been added to the shopping bag",
        action: {
          label: "View bag",
          onClick: () => router.push("/shopping-bag"),
        },
      });
    } catch (error) {
      console.error("Failed to add items to shopping bag", error);

      toast.error("Failed to add items to shopping bag!", {
        description: "Please try again later",
      });
    }
  }

  function handleSelectAll() {
    form.setValue(
      "ingredientIds",
      areAllIngredientsSelected
        ? []
        : ingredients.map((ingredient) => ingredient.id),
    );
  }

  function handleOnCheckedChange(checked: CheckedState, id: Ingredient["id"]) {
    form.setValue(
      "ingredientIds",
      checked
        ? [...selectedIngredients, id]
        : selectedIngredients.filter((value) => value !== id),
    );
  }

  return (
    <section className="mt-4">
      <h2 className="mb-3">Ingredients</h2>
      <Form {...form}>
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <ul role="list">
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <FormField
                  control={form.control}
                  name="ingredientIds"
                  defaultValue={selectedIngredients}
                  render={({ field }) => (
                    <FormItem className="mt-2 flex gap-2 space-y-0">
                      <FormControl className="mt-[3px]">
                        <Checkbox
                          checked={field.value.includes(ingredient.id)}
                          onCheckedChange={(checked) =>
                            handleOnCheckedChange(checked, ingredient.id)
                          }
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer text-base">
                        <span className="font-semibold">{ingredient.name}</span>{" "}
                        - {ingredient.quantity}{" "}
                        {ingredient.notes && `(${ingredient.notes})`}
                      </FormLabel>
                    </FormItem>
                  )}
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
                    Are you sure you want to add the selected ingredients to the
                    shopping bag?
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
  );
};
