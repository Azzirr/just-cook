import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
// TODO - i left it for now, but this section is probably to delete
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
      <SectionContent>
        <ScrollArea>
          <div className="flex gap-2 pb-3">
            {data.map((recipeData) => (
              <RecipeCard key={recipeData.id} {...recipeData} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionContent>
    </Section>
  );
};
