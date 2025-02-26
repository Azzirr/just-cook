import { RecipeSteps } from "./RecipeSteps";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeActions } from "./RecipeActions";
import { formatShortDate } from "@/utils/formatShortDate";
import { Recipe, User, Ingredient } from "@prisma/client";

type RecipePageProps = {
  recipe: Recipe & { author: User; ingredients: Ingredient[] };
};

export const RecipePage = ({ recipe }: RecipePageProps) => {
  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-3 p-6">
      <section className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h1>{recipe.name}</h1>
          <p>by {recipe.author.username}</p>
        </div>
        <div className="mb-2 sm:mt-2">
          <p className="mb-1 text-sm text-muted-foreground">
            Created {formatShortDate(recipe.createdAt)}
          </p>
          <p className="text-sm text-muted-foreground">
            Updated {formatShortDate(recipe.updatedAt)}
          </p>
        </div>
      </section>
      <RecipeActions />
      <section>
        <p>{recipe.description}</p>
      </section>
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeSteps steps={recipe.steps} />
    </div>
  );
};
