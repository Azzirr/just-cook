import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import SearchBar from "../ui-custom/SearchBar";

const Recipes = ({ recipes }: any) => {
  const t = useTranslations("Recipes");

  return (
    <div className="mx-auto max-w-96 py-5">
      <div className="mx-5">
        <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
        <SearchBar className="my-5" />
        <div className="flex flex-col gap-4">
          {recipes?.map((recipe: any) => (
            <Button
              key={recipe.name}
              asChild
              variant="secondary"
              className="rounded-3xl text-lg"
            >
              <Link href={`/1`}>{recipe.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
