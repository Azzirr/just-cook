import { RecipeForm } from "@/components/recipe-form/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-4 text-center text-2xl font-bold">Add New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
