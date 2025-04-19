import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { getRecipe } from "@/actions/recipes/getRecipe";
import { RecipeDetails } from "@/components/RecipeDetail/RecipeDetails";
import { redirect } from "@/i18n/routing";

type RecipeParams = {
  params: Promise<{ recipeId: string; recipeSlug: string }>;
};

const RecipePage = async ({ params }: RecipeParams) => {
  const { recipeId, recipeSlug } = await params;
  const recipe = await getRecipe(recipeId);
  const locale = await getLocale();

  if (!recipe) {
    notFound();
  }

  if (recipe.slug !== recipeSlug) {
    redirect({
      href: `/recipes/${recipe.id}/${recipe.slug}`,
      locale,
    });
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipePage;
