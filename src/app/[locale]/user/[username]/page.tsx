import { getUserByUsername } from "@/actions/getUserByUsername";
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

  return (
    <div className="container mx-auto py-5">
      <UserProfileCard user={user} />
      <Separator />
      <CreatedRecipesSection />
      <Separator />
      <RecentActivity />
    </div>
  );
};

export default User;
