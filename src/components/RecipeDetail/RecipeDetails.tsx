import Image from "next/image";

import { formatToShortDate } from "@/utils/formatToShortDate";
import { getRecipeLists } from "@/actions/allFavouriteListActions";
import type { Recipe, User, Ingredient } from "@prisma/client";

import { RecipeSteps } from "./RecipeSteps";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeActions } from "./RecipeActions";

type RecipePageProps = {
  recipe: Recipe & { author: User; ingredients: Ingredient[] };
};

export const RecipeDetails = async ({ recipe }: RecipePageProps) => {
  const formatDate = await formatToShortDate();
  const userLists = await getRecipeLists(true);

  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-3 p-6">
      <section className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h1>{recipe.name}</h1>
          <p>by {recipe.author.username}</p>
        </div>
        <div className="mb-2 sm:mt-2">
          <p className="mb-1 text-sm text-muted-foreground">
            Created {formatDate(recipe.createdAt)}
          </p>
          <p className="text-sm text-muted-foreground">
            Updated {formatDate(recipe.updatedAt)}
          </p>
        </div>
      </section>
      <RecipeActions userLists={userLists} />
      {recipe.images[0] && (
        <div className="relative h-[400px] w-full">
          <Image
            className="rounded-md object-cover"
            src={recipe.images[0]}
            fill
            alt={recipe.name}
          ></Image>
        </div>
      )}
      <section>
        <p>{recipe.description}</p>
      </section>
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeSteps steps={recipe.steps} />
    </div>
  );
};
