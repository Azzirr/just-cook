import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { RecipeCard } from "@/components/ui-custom/RecipeCard";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui-custom/Section";
import { Recipe } from "@prisma/client";
import { Link } from "@/i18n/routing";

type CreatedRecipesSectionProps = { recipes?: Recipe[] | null };

export const CreatedRecipesSection = ({
  recipes = [],
}: CreatedRecipesSectionProps) => {
  const hasRecipes = recipes && recipes.length > 0;

  return (
    <Section>
      <SectionTitle>Created Recipes</SectionTitle>

      <div className="flex justify-between">
        <SectionDescription>
          Recipes you've created for yourself or shared with the community
        </SectionDescription>
        <Link
          href={"/link-to-recipes-page"}
          className="text-base text-zinc-800"
        >
          See more
        </Link>
      </div>

      <SectionContent>
        <ScrollArea>
          <div className="relative flex gap-3 py-3">
            {hasRecipes ? (
              recipes.map((recipeData) => (
                <RecipeCard key={recipeData.id} recipe={recipeData} />
              ))
            ) : (
              <p className="text-muted-foreground">No recipes created yet</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionContent>
    </Section>
  );
};
