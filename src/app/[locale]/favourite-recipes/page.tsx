import {
  getRecipeLists,
  getRecipesFromList,
} from "@/actions/allFavouriteListActions";
import { FavouriteRecipes } from "@/components/FavouriteRecipes/FavouriteRecipes";

const favouriteRecipes = async () => {
  const favouriteRecipes = await getRecipesFromList();
  const userLists = await getRecipeLists(true);

  return (
    <>
      <FavouriteRecipes
        favouriteRecipes={favouriteRecipes}
        userLists={userLists}
      />
    </>
  );
};

export default favouriteRecipes;
