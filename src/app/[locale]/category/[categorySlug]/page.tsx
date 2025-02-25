import { fetchRecipesByCategory } from "@/app/actions/actions";
import Recipes from "@/components/Recipe/Recipe";

interface CategoryProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const CategoryPage = async ({ params, searchParams }: CategoryProps) => {
  const { categorySlug } = await params;
  const recipes = await fetchRecipesByCategory(categorySlug);
  const query = (await searchParams).query || "";

  return <Recipes recipes={recipes ?? []} query={query} />;
};

export default CategoryPage;
