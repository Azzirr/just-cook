import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { RecipeDetails } from "@/components/RecipeDetail/RecipeDetails";
import { redirect } from "@/i18n/routing";
import { getRecipe } from "@/actions/recipes/getRecipe";
import { RecipeForm } from "@/components/recipe-form/RecipeForm";
import { getCategories } from "@/actions/categories/getCategories";

type RecipeParams = {
  params: Promise<{ recipeId: string; recipeSlug: string }>;
};

const RecipeEditPage = async ({ params }: RecipeParams) => {
  const { recipeId, recipeSlug } = await params;
  const recipe = await getRecipe(recipeId);
  const locale = await getLocale();
  const categories = await getCategories();

  if (!recipe) {
    notFound();
  }

  if (recipe.slug !== recipeSlug) {
    redirect({
      href: `/recipes/${recipe.id}/${recipe.slug}`,
      locale,
    });
  }

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-4 text-center text-2xl font-bold">Edit Recipe</h1>
      <RecipeForm categories={categories} isEdit={true} recipe={recipe} />
    </div>
  );
};

export default RecipeEditPage;
