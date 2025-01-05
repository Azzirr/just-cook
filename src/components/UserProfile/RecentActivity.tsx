import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";
import { RecentActivityItem } from "./RecentActivityItem";
import { Separator } from "@/components/ui/separator";

export const RecentActivity = () => {
  const activities = [
    {
      type: "comment",
      recipe: "Chocolate Chip Cookies",
      time: "2 hours ago",
      id: 1,
    },
    {
      type: "rating",
      recipe: "Beef Stir Fry",
      rating: 5,
      time: "1 day ago",
      id: 2,
    },
    {
      type: "view",
      recipe: "Vegetable Lasagna",
      time: "3 days ago",
      id: 3,
    },
    {
      type: "save",
      recipe: "Lemon Garlic Salmon",
      time: "1 week ago",
      id: 4,
    },
  ];

  return (
    <Section>
      <SectionTitle>Recent Activity</SectionTitle>
      <SectionDescription>See what you've been up to lately</SectionDescription>
      <SectionContent className="flex w-max gap-2">
        <ul className="flex flex-col gap-2">
          {activities.map((activityData, index) => (
            <>
              {index !== 0 && <Separator />}
              <RecentActivityItem key={activityData.id} {...activityData} />
            </>
          ))}
        </ul>
      </SectionContent>
    </Section>
  );
};
