"use client";

import { Heart, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RecipePageDialog } from "./RecipePageDialog";
import type { RecipeList } from "@prisma/client";
import { addRecipeToFavouriteList } from "@/actions/favourite-list-actions/recipe-operations";

type RecipeActionsProps = {
  userLists: RecipeList[];
};

export const RecipeActions = ({ userLists }: RecipeActionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const recipeActions = [
    {
      icon: Heart,
      //There is no 3rd argument, so we are adding recipe to Favourites list
      action: () => {
        addRecipeToFavouriteList("d107bya0s4hfp3z4dmh1vl7k"); //TODO - change "1" to real id
      },
      screenReadersOnlyText: "Add recipe to favorites",
    },
    {
      icon: PlusCircleIcon,
      action: () => setOpenDialog(true),
      screenReadersOnlyText: "Add recipe to list",
    },
  ];

  return (
    <div className="space-x-1">
      {recipeActions.map(
        ({ icon: Icon, action, screenReadersOnlyText }, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={action}
            className="size-max rounded-full p-1 transition-all duration-150 hover:bg-red-100 hover:text-red-500 focus-visible:bg-red-100 focus-visible:text-red-500 active:scale-110"
          >
            <Icon />
            <span className="sr-only">{screenReadersOnlyText}</span>
          </Button>
        ),
      )}
      <RecipePageDialog
        isOpen={openDialog}
        setOpen={setOpenDialog}
        userLists={userLists}
      />
    </div>
  );
};
