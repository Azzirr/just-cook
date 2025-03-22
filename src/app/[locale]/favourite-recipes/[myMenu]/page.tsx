import { getRecipesFromList } from "@/actions/allFavouriteListActions";
import { UserListContent } from "@/components/FavouriteRecipes/UserListContent";
import { getCurrentUrlOnServerSide } from "@/utils/getCurrentUrlOnServerSide";

const myMenu = async () => {
  const currentUrl = await getCurrentUrlOnServerSide();
  //last segment of link is actual list id
  const listId = Number(currentUrl.split("/").pop() || "");
  const userListContent = await getRecipesFromList(listId);

  return (
    <>
      <UserListContent userListContent={userListContent} />
    </>
  );
};

export default myMenu;
