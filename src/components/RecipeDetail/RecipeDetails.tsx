import type {
  Recipe,
  User,
  Ingredient,
  RecipeCategory,
  RecipeComment,
} from "@prisma/client";
import Image from "next/image";

import { getRecipeLists } from "@/actions/allFavouriteListActions";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { formatToShortDate } from "@/utils/formatToShortDate";

import { RecipeActions } from "./RecipeActions";
import { RecipeBreadcrumbs } from "./RecipeBreadcrumbs";
import { RecipeComments } from "./RecipeComments";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeSteps } from "./RecipeSteps";

type Comment = RecipeComment & { author: User };

type RecipePageProps = {
  recipe: Recipe & {
    author: User;
    ingredients: Ingredient[];
    category: RecipeCategory;
    comments: Comment[];
  };
};

export const RecipeDetails = async ({ recipe }: RecipePageProps) => {
  const formatDate = await formatToShortDate();
  const userLists = await getRecipeLists(true);

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
          <RecipeActions userLists={userLists} />
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
      <section>
        <RecipeComments recipe={recipe} />
      </section>
    </article>
  );
};
