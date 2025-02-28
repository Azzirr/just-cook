import { notFound } from "next/navigation";

import { RecipeDetail } from "@/components/RecipeDetail/RecipeDetail";
import { getRecipe } from "@/actions/getRecipe";

type RecipeParams = {
  params: Promise<{ recipeSlug: string }>;
};

const RecipePage = async ({ params }: RecipeParams) => {
  const { recipeSlug } = await params;
  const recipe = await getRecipe(recipeSlug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
};

export default RecipePage;
