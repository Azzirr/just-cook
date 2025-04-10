"use client";

import { Heart, PlusCircleIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addRecipeToList } from "@/actions/allFavouriteListActions";
import { useState } from "react";
import { RecipePageDialog } from "./RecipePageDialog";
import type { Recipe, RecipeList } from "@prisma/client";
import { Link } from "@/i18n/routing";

type RecipeActionsProps = {
  userLists: RecipeList[];
  recipe: Recipe;
  isCreator?: boolean;
};

export const RecipeActions = ({
  userLists,
  recipe,
  isCreator = false,
}: RecipeActionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const buttonActions = [
    {
      icon: Heart,
      //There is no 3rd argument, so we are adding recipe to Favourites list
      action: () => {
        addRecipeToList("1"); //TODO - change "1" to real id
      },
      screenReadersOnlyText: "Add recipe to favorites",
    },
    {
      icon: PlusCircleIcon,
      action: () => setOpenDialog(true),
      screenReadersOnlyText: "Add recipe to list",
    },
  ];

  const linkActions = [
    {
      icon: Pencil,
      href: `/recipes/${recipe.id}/${recipe.slug}/edit`,
      shouldDisplay: isCreator,
      screenReadersOnlyText: "Edit recipe",
    },
  ];

  const buttonClassName =
    "size-max rounded-full p-1 transition-all duration-150 hover:bg-red-100 hover:text-red-500 focus-visible:bg-red-100 focus-visible:text-red-500 active:scale-110";

  return (
    <div className="space-x-1">
      {buttonActions.map(
        ({ icon: Icon, action, screenReadersOnlyText }, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={action}
            className={buttonClassName}
          >
            <Icon />
            <span className="sr-only">{screenReadersOnlyText}</span>
          </Button>
        ),
      )}

      {linkActions
        .filter((action) => action.shouldDisplay)
        .map(({ icon: Icon, href, screenReadersOnlyText }, index) => (
          <Button
            key={`link-${index}`}
            variant="ghost"
            asChild
            className={buttonClassName}
          >
            <Link href={href}>
              <Icon />
              <span className="sr-only">{screenReadersOnlyText}</span>
            </Link>
          </Button>
        ))}
      <RecipePageDialog
        isOpen={openDialog}
        setOpen={setOpenDialog}
        userLists={userLists}
      />
    </div>
  );
};
