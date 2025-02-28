import { useTranslations } from "next-intl";

import SearchBar from "@/components/ui-custom/SearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { Recipe } from "@prisma/client";

interface RecipesProps {
  recipes: Recipe[];
  query?: string;
}

const Recipes = ({ recipes, query = "" }: RecipesProps) => {
  const t = useTranslations("Recipes");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <div className="mx-auto max-w-96 py-5">
      <div className="mx-5">
        <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
        <SearchBar className="my-5" />
        <div className="flex flex-col gap-4">
          {filteredRecipes.length === 0 ? (
            <p className="mx-auto text-lg text-red-700">No recipes found...</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <Button
                key={recipe.id}
                asChild
                variant="secondary"
                className="rounded-3xl text-lg"
              >
                <Link href={`/recipes/${recipe.slug}`}>{recipe.name}</Link>
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
