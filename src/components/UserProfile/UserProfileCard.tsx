import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileHeaderButtons } from "@/components/UserProfile/UserProfileHeaderButtons";
import {
  Section,
  SectionTitle,
  SectionDescription,
} from "@/components/ui-custom/Section";
import { User } from "@prisma/client";
import { useFormatter } from "next-intl";
import { getUsernameInitials } from "@/utils/getUsernameInitials";

type UserProfileCardProps = {
  user: User;
};

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const format = useFormatter();
  const joinDate = format.dateTime(user.createdAt, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
