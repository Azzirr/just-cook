import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";
import {
  RecipeCard,
  type RecipeCardProps,
} from "@/components/ui-custom/RecipeCard";

export const SavedRecipesSection = () => {
  const data: RecipeCardProps[] = [
    {
      name: "Chocolate Lava Cake",
      id: 5,
      description: "by Chef Marie",
      tags: ["Dessert", "Baking"],
    },
    {
      name: "Chicken Alfredo",
      id: 6,
      description: "by Chef Gordon",
      tags: ["Italian"],
    },
    {
      name: "Pancakes",
      id: 7,
      description: "by Chef John",
      tags: ["Breakfast"],
    },
    {
      name: "Tonkotsu Ramen",
      id: 8,
      description: "by Chef Hiro",
      tags: ["Japanese"],
    },
  ];

  return (
    <Section>
      <SectionTitle>Saved Recipes</SectionTitle>
      <SectionDescription>
        Recipes you've bookmarked for later
      </SectionDescription>
      <ScrollArea className="w-full">
        <SectionContent className="flex gap-2">
          {data.map((recipeData) => (
            <RecipeCard key={recipeData.id} {...recipeData} />
          ))}
        </SectionContent>
      </ScrollArea>
    </Section>
  );
};
