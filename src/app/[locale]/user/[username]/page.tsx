import { getUserByUsername } from "@/actions/getUserByUsername";
import { getRecipes } from "@/actions/recipes/getRecipes";
import { Separator } from "@/components/ui/separator";

import { CreatedRecipesSection } from "@/components/UserProfile/CreatedRecipesSection";
import { RecentActivity } from "@/components/UserProfile/RecentActivity";
import { UserProfileCard } from "@/components/UserProfile/UserProfileCard";

type UserProps = {
  params: Promise<{
    username: string;
  }>;
};

const User = async ({ params }: UserProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) return;

  const recipes = await getRecipes({ authorId: user?.id, limit: 6 });

  return (
    <div className="container mx-auto py-5">
      <UserProfileCard user={user} />
      <Separator />
      <CreatedRecipesSection recipes={recipes} />
      <Separator />
      <RecentActivity />
    </div>
  );
};

export default User;
