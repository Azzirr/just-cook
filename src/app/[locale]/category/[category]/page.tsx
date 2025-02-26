import { getRecipesByCategory } from "@/actions/getCategories";
import Recipes from "@/components/Recipe/Recipe";

interface CategoryProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const category = async ({ params, searchParams }: CategoryProps) => {
  const { category } = await params;
  const categoryId = parseInt(category);
  const recipes = await getRecipesByCategory(categoryId);
  const query = (await searchParams).query || "";

  return (
    <>
      <Recipes recipes={recipes ?? []} query={query} />
    </>
  );
};

export default category;
