import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { UserList } from "./userList";

const FavouriteRecipes = ({ favouriteRecipes, userLists }: any) => {
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
          {favouriteRecipes?.map((recipe: any, index: number) => (
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
          <Separator />
          {userLists.map((menu: any, index: any) => (
            <Link href={`/favourite-recipes/${menu.id}`} key={menu.id}>
              <UserList recipe={menu} index={index} />
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export { FavouriteRecipes };
