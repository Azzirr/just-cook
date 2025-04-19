import { getRecipes } from "@/actions/recipes/getRecipes";
import { getRecipesByPhrase } from "@/actions/recipes/getRecipesByPhrase";
import { RecipeCard } from "@/components/ui-custom/RecipeCard";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const RecipesPage = async ({ searchParams }: Props) => {
  const { searchPhrase } = await searchParams;

  const recipes = searchPhrase
    ? await getRecipesByPhrase({ phrase: searchPhrase })
    : await getRecipes({ limit: 25 });

  return (
    <div className="m-4">
      {recipes.length === 0 ? (
        <div className="mt-10 text-center text-lg text-gray-500">
          No recipes found.
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex justify-center">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
