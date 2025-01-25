import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MyMenu } from "./MyMenu";
import { MyMenuElement } from "./MyMenuElement";

//TODO - favourite recipes from database
const favouriteRecipes = [
  { id: 1, name: "Spaghetti Bolognese" },
  { id: 2, name: "Chicken Caesar Salad" },
  { id: 3, name: "Vegetarian Tacos" },
  { id: 4, name: "Beef Stroganoff" },
  { id: 5, name: "Lemon Cheesecake" },
  { id: 1, name: "Spaghetti Bolognese" },
  { id: 2, name: "Chicken Caesar Salad" },
  { id: 3, name: "Vegetarian Tacos" },
  { id: 4, name: "Beef Stroganoff" },
  { id: 5, name: "Lemon Cheesecake" },
  { id: 1, name: "Spaghetti Bolognese" },
  { id: 2, name: "Chicken Caesar Salad" },
  { id: 3, name: "Vegetarian Tacos" },
  { id: 4, name: "Beef Stroganoff" },
  { id: 5, name: "Lemon Cheesecake" },
];

const FavouriteRecipes = () => {
  const t = useTranslations("Favourites");

  return (
    <>
      <Tabs defaultValue="favourites">
        <TabsList className="mt-5 flex items-center gap-5 bg-gray-100 py-8">
          <TabsTrigger value="favourites" className="min-w-[40vw]">
            {t("favourites")}
          </TabsTrigger>
          <TabsTrigger value="myMenu" className="min-w-[40vw]">
            {t("myMenu")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="favourites" className="mt-5">
          <Separator />
          {favouriteRecipes.map((recipe, index) => (
            // TODO - fix redirect
            <Link href={`/category/1/${recipe.name}`} key={recipe.id}>
              <MyMenuElement recipe={recipe} index={index} />
            </Link>
          ))}
          <Separator />
        </TabsContent>
        <TabsContent value="myMenu" className="mt-5">
          <Separator />
          <MyMenu />
          <Separator />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { FavouriteRecipes };
