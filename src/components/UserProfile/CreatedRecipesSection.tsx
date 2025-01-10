import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  RecipeCard,
  type RecipeCardProps,
} from "@/components/ui-custom/RecipeCard";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";

export const CreatedRecipesSection = () => {
  const data: RecipeCardProps[] = [
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

  return (
    <Section>
      <SectionTitle>Created Recipes</SectionTitle>
      <SectionDescription>
        Recipes you've created for yourself or shared with the community
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
