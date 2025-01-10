import { Fragment } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";

import { RecentActivityItem } from "./RecentActivityItem";

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
    {
      type: "save",
      recipe: "Chicken Alfredo",
      time: "2 weeks ago",
      id: 5,
    },
    {
      type: "comment",
      recipe: "Spaghetti Carbonara",
      time: "3 weeks ago",
      id: 6,
    },
  ];

  return (
    <Section>
      <SectionTitle>Recent Activity</SectionTitle>
      <SectionDescription>See what you've been up to lately</SectionDescription>
      <SectionContent className="flex w-max gap-2">
        <ScrollArea className="max-h-64">
          <ul className="flex flex-col gap-2 py-2 pe-4">
            {activities.map((activityData, index) => (
              <Fragment key={activityData.id}>
                {index !== 0 && <Separator />}
                <RecentActivityItem {...activityData} />
              </Fragment>
            ))}
          </ul>
        </ScrollArea>
      </SectionContent>
    </Section>
  );
};
