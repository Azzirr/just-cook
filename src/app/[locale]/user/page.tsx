import { Separator } from "@/components/ui/separator";

import { CreatedRecipesSection } from "@/components/UserProfile/CreatedRecipesSection";
import { SavedRecipesSection } from "@/components/UserProfile/SavedRecipesSection";
import { RecentActivity } from "@/components/UserProfile/RecentActivity";
import UserProfileCard from "@/components/UserProfile/UserProfileCard";

const user = () => {
  return (
    <div className="container mx-auto py-5">
      <UserProfileCard />
      <Separator />
      <CreatedRecipesSection />
      <Separator />
      <RecentActivity />
    </div>
  );
};

export default user;
