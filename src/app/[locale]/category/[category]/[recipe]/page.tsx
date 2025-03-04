import { RecipePage } from "@/components/RecipePage/RecipePage";
import { currentSession } from "@/lib/currentSession";

const recipe = async () => {
  const user = await currentSession();
  return <RecipePage user={user} />;
};

export default recipe;
