import { notFound } from "next/navigation";

import { RecipeDetail } from "@/components/RecipeDetail/RecipeDetail";
import { getRecipe } from "@/actions/getRecipe";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

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

  return <RecipeDetail recipe={recipe} />;
};

export default RecipePage;
