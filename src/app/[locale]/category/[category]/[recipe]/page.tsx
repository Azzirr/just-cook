import { getRecipe } from "@/actions/getRecipe";
import { NotFoundFallback } from "@/components/NotFoundFallback/NotFoundFallback";
import { RecipePage } from "@/components/RecipePage/RecipePage";

type RecipeParams = {
  params: Promise<{
    recipe: string;
  }>;
};

const recipe = async ({ params }: RecipeParams) => {
  const { recipe: recipeId } = await params;

  const recipe = await getRecipe(Number(recipeId));

  if (!recipe)
    return (
      <NotFoundFallback buttonHref="/" buttonLabel="Return to categories" />
    );

  return <RecipePage recipe={recipe} />;
};

export default recipe;
