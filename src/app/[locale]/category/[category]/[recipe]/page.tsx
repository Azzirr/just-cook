import { getRecipe } from "@/actions/getRecipe";
import { RecipePage } from "@/components/RecipePage/RecipePage";
import { currentSession } from "@/lib/currentSession";
import { notFound } from "next/navigation";

type RecipeParams = {
  params: Promise<{
    recipe: string;
  }>;
};

const recipe = async ({ params }: RecipeParams) => {
  const { recipe: recipeId } = await params;

  const recipe = await getRecipe(Number(recipeId));

  if (!recipe) return notFound();

  const user = await currentSession();
  return <RecipePage recipe={recipe} user={user} />;
};

export default recipe;
