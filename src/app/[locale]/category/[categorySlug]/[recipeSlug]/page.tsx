import { getRecipe } from "@/actions/getRecipe";
import { RecipeDetail } from "@/components/RecipeDetail/RecipeDetail";
import { notFound } from "next/navigation";

type RecipeParams = {
  params: Promise<{
    recipeSlug: string;
  }>;
};

const RecipePage = async ({ params }: RecipeParams) => {
  const { recipeSlug } = await params;

  const recipe = await getRecipe(recipeSlug);

  if (!recipe) return notFound();

  return <RecipeDetail recipe={recipe} />;
};

export default RecipePage;
