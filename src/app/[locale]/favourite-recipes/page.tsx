import {
  getRecipeLists,
  getRecipesFromList,
} from "@/actions/favourite-list-actions/queries";
import { FavouriteRecipes } from "@/components/FavouriteRecipes/FavouriteRecipes";

const FavouriteRecipesPage = async () => {
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

export default FavouriteRecipesPage;
