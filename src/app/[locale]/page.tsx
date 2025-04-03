import { setRequestLocale } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { getCategories } from "@/actions/categories/getCategories";
import SearchBar from "@/components/ui-custom/SearchBar";
import { CategoriesPreviewCard } from "@/components/Home/CategoriesPreviewCard";
import { RecipeCarousel } from "@/components/Home/RecipeCarousel";
import { getRecipes } from "@/actions/recipes/getRecipes";

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const HomePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const categories = await getCategories();
  const recipes = (await getRecipes({ limit: 10 })) || [];

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="mt-3 text-2xl">What do you want to cook today?</h1>
      <div className="max-w-[400px]">
        <SearchBar></SearchBar>
      </div>
      <CategoriesPreviewCard categories={categories}></CategoriesPreviewCard>
      <div className="pt-[40px]">
        <p className="pb-[20px] text-xl">Recently added recipes</p>
        <RecipeCarousel recipes={recipes}></RecipeCarousel>
      </div>
    </div>
  );
};

export default HomePage;
