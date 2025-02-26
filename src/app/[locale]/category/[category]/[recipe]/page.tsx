import { RecipePage } from "@/components/RecipePage/RecipePage";
import { currentUser } from "@/lib/currentUser";

const recipe = async () => {
  const user = await currentUser();
  return <RecipePage user={user} />;
};

export default recipe;
