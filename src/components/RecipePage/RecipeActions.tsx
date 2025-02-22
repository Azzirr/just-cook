"use client";
import { Heart, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  addRecipeToList,
  createRecipeList,
  getRecipesFromList,
  removeRecipeFromList,
} from "@/actions/allFavouriteListActions";

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

function addToList() {
  addRecipeToList("cm7f2p20q0000wm78xqnwt1ha", 4, 3);
}
function removeFromList() {
  removeRecipeFromList("cm7f2p20q0000wm78xqnwt1ha", 4, 3);
}
function getAllRecipes() {
  getRecipesFromList("cm7f2p20q0000wm78xqnwt1ha", 1);
}
function createNewList() {
  createRecipeList("cm7f2p20q0000wm78xqnwt1ha", "Dishes");
}

export const RecipeActions = () => {
  return (
    <section>
      <Button onClick={addToList}>ADD</Button>
      <Button onClick={removeFromList}>ODD</Button>
      <Button onClick={getAllRecipes}>ALL</Button>
      <Button onClick={createNewList}>CREATE</Button>
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
