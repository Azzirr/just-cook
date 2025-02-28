import { getCategoryRecipes } from "@/app/actions/actions";
import Recipes from "@/components/Recipe/Recipes";

interface CategoryProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const CategoryPage = async ({ params, searchParams }: CategoryProps) => {
  const { categorySlug } = await params;
  const { query } = await searchParams;
  const recipes = await getCategoryRecipes(categorySlug);

  return <Recipes recipes={recipes} query={query} />;
};

export default CategoryPage;
