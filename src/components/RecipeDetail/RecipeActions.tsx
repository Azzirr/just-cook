"use client";
import { Heart, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addRecipeToList } from "@/actions/allFavouriteListActions";
import { useState } from "react";
import { RecipePageDialog } from "./RecipePageDialog";
import { RecipeList } from "@prisma/client";

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
        addRecipeToList(1); //TODO - change "1" to real id
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
      <RecipePageDialog
        isOpen={openDialog}
        setOpen={setOpenDialog}
        userLists={userLists}
      />
    </section>
  );
};
