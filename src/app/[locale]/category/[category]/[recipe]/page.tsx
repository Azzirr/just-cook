import { getRecipe } from "@/actions/getRecipe";
import { RecipePage } from "@/components/RecipePage/RecipePage";

type RecipeParams = {
  params: Promise<{
    recipe: string;
  }>;
};

const recipe = async ({ params }: RecipeParams) => {
  const { recipe: recipeId } = await params;

  const recipe = await getRecipe(Number(recipeId));
  if (!recipe) return;

  return <RecipePage recipe={recipe} />;
};

export default recipe;
