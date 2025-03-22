import { getRecipesFromList } from "@/actions/allFavouriteListActions";
import { MyMenuContent } from "@/components/FavouriteRecipes/MyMenuContent";

const myMenu = async () => {
  const userListContent = await getRecipesFromList(3);

  return (
    <>
      <MyMenuContent userListContent={userListContent} />
    </>
  );
};

export default myMenu;
