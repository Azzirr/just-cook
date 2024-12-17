import { fetchRecipes } from "@/app/actions/actions";
import Recipes from "@/components/Recipe/Recipe";

const category = async () => {
  const recipes = await fetchRecipes();
  return (
    <>
      <Recipes recipes={recipes} />
    </>
  );
};
export default category;
