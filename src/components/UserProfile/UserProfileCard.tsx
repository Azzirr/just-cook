import { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Section,
  SectionTitle,
  SectionDescription,
} from "@/components/ui-custom/Section";
import { UserProfileHeaderButtons } from "@/components/UserProfile/UserProfileHeaderButtons";
import { formatToShortDate } from "@/utils/formatToShortDate";
import { getUsernameInitials } from "@/utils/getUsernameInitials";

type UserProfileCardProps = {
  user: User;
};

const UserProfileCard = async ({ user }: UserProfileCardProps) => {
  const format = await formatToShortDate();
  const joinDate = format(user.createdAt);

  return (
    <div className="flex justify-between">
      <Section className="flex items-center gap-4">
        <Avatar className="h-20 w-20 bg-slate-50">
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{getUsernameInitials(user.username)}</AvatarFallback>
        </Avatar>
        <Section className="p-0">
          <SectionTitle className="text-[18px]">{user.username}</SectionTitle>
          <SectionDescription className="text-[12px]">
            Joined {joinDate}
          </SectionDescription>
        </Section>
      </Section>
      <Section className="flex items-center">
        <UserProfileHeaderButtons user={user} />
      </Section>
    </div>
  );
};
export { UserProfileCard };
