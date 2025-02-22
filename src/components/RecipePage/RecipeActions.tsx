"use client";
import { Heart, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addRecipeToList } from "@/actions/allFavouriteListActions";

const recipeActions = [
  {
    icon: Heart,
    //There is no 3rd argument, so we are adding recipe to Favourites list
    //TODO - take authorized user id and paste it to addRecipeToList, also add error or something if user is not logged in
    action: () => addRecipeToList("", 2),
    screenReadersOnlyText: "Add recipe to favorites",
  },
  {
    icon: PlusCircleIcon,
    //TODO - show a modal to user, which has all custom Recipe Lists and give him an option to add recipe to
    action: () => console.log("Added to list"),
    screenReadersOnlyText: "Add recipe to list",
  },
];

export const RecipeActions = () => {
  return (
    <section>
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
