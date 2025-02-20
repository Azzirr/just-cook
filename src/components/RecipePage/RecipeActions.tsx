"use client";
import { Heart, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  addRecipeToFavourites,
  getFavouriteRecipes,
  removeRecipeFromFavourites,
} from "@/app/actions/actions";

const recipeActions = [
  {
    icon: Heart,
    action: () => console.log("Added to favorites"),
    screenReadersOnlyText: "Add recipe to favorites",
  },
  {
    icon: PlusCircleIcon,
    action: () => console.log("Added to list"),
    screenReadersOnlyText: "Add recipe to list",
  },
];

function add() {
  addRecipeToFavourites("cm74xnpas0000wmygiqlxsanz", 2);
}
function odd() {
  removeRecipeFromFavourites("cm74xnpas0000wmygiqlxsanz", 1);
}
function all() {
  getFavouriteRecipes("cm74xnpas0000wmygiqlxsanz");
}

export const RecipeActions = () => {
  return (
    <section>
      <Button onClick={add}>ADD</Button>
      <Button onClick={odd}>ODD</Button>
      <Button onClick={all}>ALL</Button>
      {recipeActions.map(
        ({ icon: Icon, action, screenReadersOnlyText }, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={action}
            className="size-10 rounded-full transition-all duration-150 hover:bg-red-100 hover:text-red-500 focus-visible:bg-red-100 focus-visible:text-red-500 active:scale-110"
          >
            <Icon className="size-8" />
            <span className="sr-only">{screenReadersOnlyText}</span>
          </Button>
        ),
      )}
    </section>
  );
};
