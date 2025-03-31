import { getRecipes } from "@/actions/recipes/getRecipes";
import { RecipeCard } from "@/components/ui-custom/RecipeCard";

const RecipesPage = async () => {
  const recipes = (await getRecipes({ limit: 25 })) ?? [];

  return (
    <div className="m-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
      {recipes?.map((recipe) => (
        <div className="flex justify-center">
          <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
        </div>
      ))}
    </div>
  );
};

export default RecipesPage;
