import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";
import { CreatedRecipesCard } from "./CreatedRecipesCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  {
    name: "Spaghetti Carbonara",
    id: 1,
    description: "42 likes",
    tags: ["Italian", "Pasta"],
  },
  {
    name: "Chicken Tikka Masala",
    id: 2,
    description: "Private",
    tags: ["Indian"],
  },
  {
    name: "Chocolate Chip Cookies",
    id: 3,
    description: "10 likes",
    tags: ["Dessert", "Baking"],
  },
  {
    name: "Grilled Cheese Sandwich",
    id: 4,
    description: "Private",
    tags: ["American"],
  },
];

export const CreatedRecipesSection = () => {
  return (
    <Section>
      <SectionTitle>Created Recipes</SectionTitle>
      <SectionDescription>
        Recipes you've created for yourself or shared with the community
      </SectionDescription>
      <ScrollArea className="w-full">
        <SectionContent className="flex w-max gap-2">
          {data.map((v) => (
            <CreatedRecipesCard key={v.id} {...v} />
          ))}
        </SectionContent>
      </ScrollArea>
    </Section>
  );
};
