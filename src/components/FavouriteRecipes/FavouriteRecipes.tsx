import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { UserList } from "./UserList";
import { CreateNewList } from "./CreateNewList";
import { Recipe, RecipeList } from "@prisma/client";

interface FavouriteRecipesProps {
  favouriteRecipes: Recipe[] | null;
  userLists: RecipeList[];
}

const FavouriteRecipes = ({
  favouriteRecipes,
  userLists,
}: FavouriteRecipesProps) => {
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
          {favouriteRecipes?.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}/${recipe.slug}`}
              className="block w-full text-center"
            >
              <UserList recipe={recipe} index={index} />
            </Link>
          ))}
          <Separator />
        </TabsContent>

        <TabsContent
          value="myMenu"
          className="mt-5 w-full max-w-md lg:max-w-lg"
        >
          <CreateNewList />
          <Separator />
          {userLists.map((recipe, index) => (
            <Link href={`/favourite-recipes/${recipe.id}`} key={recipe.id}>
              <UserList recipe={recipe} index={index} />
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export { FavouriteRecipes };
