import Image from "next/image";

import { formatToShortDate } from "@/utils/formatToShortDate";
import {
  getCurrentUserId,
  getRecipeLists,
} from "@/actions/allFavouriteListActions";
import { Link } from "@/i18n/routing";
import type { Recipe, User, Ingredient, RecipeCategory } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

import { RecipeSteps } from "./RecipeSteps";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeActions } from "./RecipeActions";
import { RecipeBreadcrumbs } from "./RecipeBreadcrumbs";

type RecipePageProps = {
  recipe: Recipe & {
    author: User;
    ingredients: Ingredient[];
    category: RecipeCategory;
  };
};

export const RecipeDetails = async ({ recipe }: RecipePageProps) => {
  const formatDate = await formatToShortDate();
  const userLists = await getRecipeLists(true);
  const userId = await getCurrentUserId();

  const hasUserCreatedRecipe = (
    userId: User["id"] | undefined,
    authorId: Recipe["authorId"],
  ) => {
    return userId !== undefined && userId === authorId;
  };

  return (
    <article className="mx-auto mb-4 w-full max-w-[80ch] space-y-8 p-5">
      <RecipeBreadcrumbs recipe={recipe} />
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <div>
            <h1>{recipe.name}</h1>
            <p>by {recipe.author.username}</p>
          </div>
          <div className="shrink-0 space-y-1 sm:mt-2">
            <p className="text-sm text-muted-foreground">
              Created {formatDate(recipe.createdAt)}
            </p>
            <p className="text-sm text-muted-foreground">
              Updated {formatDate(recipe.updatedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link href={`/categories/${recipe.category.slug}`}>
            <Badge className="text-sm">{recipe.category.name}</Badge>
          </Link>
          <RecipeActions
            userLists={userLists}
            recipe={recipe}
            isCreator={hasUserCreatedRecipe(userId, recipe.authorId)}
          />
        </div>
      </section>
      {recipe.images[0] && (
        <div className="relative h-[400px] w-full">
          <Image
            className="rounded-md object-cover"
            src={recipe.images[0]}
            fill
            alt={recipe.name}
          />
        </div>
      )}
      <section>
        <p>{recipe.description}</p>
      </section>
      <section>
        <RecipeIngredients ingredients={recipe.ingredients} />
      </section>
      <section>
        <RecipeSteps steps={recipe.steps} />
      </section>
    </article>
  );
};
