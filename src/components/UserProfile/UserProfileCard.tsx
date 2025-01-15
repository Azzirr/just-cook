import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileHeaderButtons } from "@/components/UserProfile/UserProfileHeaderButtons";
import {
  Section,
  SectionTitle,
  SectionDescription,
} from "@/components/ui-custom/Section";

const UserProfileCard = () => {
  const data = {
    username: "John Lemon",
    joined: "March 2023",
    avatarSrc: "/images/egg.png",
  };
  return (
    <div className="flex justify-between">
      <Section className="flex items-center gap-4">
        <Avatar className="h-20 w-20 bg-slate-50">
          <AvatarImage src={data.avatarSrc} />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <Section className="p-0">
          <SectionTitle className="text-[18px]">{data.username}</SectionTitle>
          <SectionDescription className="text-[12px]">
            Joined {data.joined}
          </SectionDescription>
        </Section>
      </Section>
      <Section className="flex items-center">
        <UserProfileHeaderButtons thisUser />
      </Section>
    </div>
  );
};
export default UserProfileCard;
