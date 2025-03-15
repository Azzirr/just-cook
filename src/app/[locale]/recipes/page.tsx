import { getRecipes } from "@/actions/recipes/getRecipes";
import { RecipeCard } from "@/components/ui-custom/RecipeCard";

const RecipesPage = async () => {
  const recipes = (await getRecipes()) ?? [];
  //handle loading here
  return (
    <div className="m-4">
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
      ))}
    </div>
  );
};

export default RecipesPage;
