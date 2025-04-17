import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Recipe } from "@prisma/client";
import { RecipeCard } from "../ui-custom/RecipeCard";

type RecipeCarouselProps = {
  recipes: Recipe[];
};

export const RecipeCarousel = ({ recipes }: RecipeCarouselProps) => {
  return (
    <Carousel className="mx-[3rem]">
      <CarouselContent>
        {recipes.map((recipe) => (
          <CarouselItem
            key={recipe.id}
            className="flex items-center justify-center sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <RecipeCard recipe={recipe}></RecipeCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
