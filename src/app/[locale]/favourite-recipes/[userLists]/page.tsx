import { getRecipesFromList } from "@/actions/allFavouriteListActions";
import { UserListContent } from "@/components/FavouriteRecipes/UserListContent";

const UserListsPage = async ({
  params,
}: {
  params: Promise<{ locale: string; userLists: string }>;
}) => {
  const { userLists } = await params;
  const listId = Number(userLists);

  const userListContent = await getRecipesFromList(Number(listId));

  return (
    <>
      <UserListContent userListContent={userListContent} />
    </>
  );
};

export default UserListsPage;
