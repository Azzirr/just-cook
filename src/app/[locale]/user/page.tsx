import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Section,
  SectionTitle,
  SectionDescription,
} from "@/components/ui-custom/Section";

import { CreatedRecipesSection } from "@/components/UserProfile/CreatedRecipesSection";
import { SavedRecipesSection } from "@/components/UserProfile/SavedRecipesSection";
import { RecentActivity } from "@/components/UserProfile/RecentActivity";
import { UserProfileHeaderButtons } from "@/components/UserProfile/UserProfileHeaderButtons";

const page = () => {
  const data = {
    username: "John Lemon",
    joined: "March 2023",
    avatarSrc: "/images/egg.png",
  };

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between">
        <Section className="flex items-center gap-4">
          <Avatar className="h-20 w-20 bg-slate-50">
            <AvatarImage src={data.avatarSrc} />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <Section className="p-0">
            <SectionTitle>{data.username}</SectionTitle>
            <SectionDescription>Joined {data.joined}</SectionDescription>
          </Section>
        </Section>
        <Section className="flex items-center">
          <UserProfileHeaderButtons thisUser />
        </Section>
      </div>
      <Separator />
      <CreatedRecipesSection />
      <Separator />
      <SavedRecipesSection />
      <Separator />
      <RecentActivity />
    </div>
  );
};

export default page;
