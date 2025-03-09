import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MyMenu } from "./MyMenu";
import { MyMenuElement } from "./MyMenuElement";

//TODO - favourite recipes from database
const favouriteRecipes = [
  { id: 1, name: "Spaghetti Bolognese", slug: "spaghetti-bolognese" },
  { id: 2, name: "Chicken Caesar Salad", slug: "chicken-caesar-salad" },
  { id: 3, name: "Vegetarian Tacos", slug: "vegetarian-tacos" },
  { id: 4, name: "Beef Stroganoff", slug: "beef-stroganoff" },
  { id: 5, name: "Lemon Cheesecake", slug: "lemon-cheesecake" },
];

const FavouriteRecipes = () => {
  const t = useTranslations("Favourites");

  return (
    <>
      <Tabs
        defaultValue="favourites"
        className="flex w-full flex-col items-center justify-center"
      >
        <TabsList className="mt-5 flex w-full max-w-md items-center justify-center gap-5 bg-gray-100 py-4 lg:max-w-lg">
          <TabsTrigger value="favourites" className="w-1/2 text-center">
            {t("favourites")}
          </TabsTrigger>
          <TabsTrigger value="myMenu" className="w-1/2 text-center">
            {t("myMenu")}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="favourites"
          className="mt-5 w-full max-w-md lg:max-w-lg"
        >
          <Separator />
          {favouriteRecipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}/${recipe.slug}`}
              className="block w-full text-center"
            >
              <MyMenuElement recipe={recipe} index={index} />
            </Link>
          ))}
          <Separator />
        </TabsContent>

        <TabsContent
          value="myMenu"
          className="mt-5 w-full max-w-md lg:max-w-lg"
        >
          <Separator />
          <MyMenu />
          <Separator />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { FavouriteRecipes };
