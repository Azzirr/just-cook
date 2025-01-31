import { RecipeForm } from "@/components/recipe-form/RecipeForm";
import { getCategories } from "@/actions/getCategories";

const NewRecipePage = async () => {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-4 text-center text-2xl font-bold">Add New Recipe</h1>
      <RecipeForm categories={categories} />
    </div>
  );
};

export default NewRecipePage;
