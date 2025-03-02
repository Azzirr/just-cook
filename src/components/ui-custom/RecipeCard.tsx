import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/utils/truncateText";
import { Recipe } from "@prisma/client";
import { Utensils } from "lucide-react";
import Image from "next/image";

export type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { name, description, images } = recipe;
  const recipeImage = images[0];

  return (
    <Card className="w-64 cursor-pointer overflow-hidden rounded-2xl shadow-md">
      <div className="relative h-40 w-full">
        {recipeImage ? (
          <Image src={recipeImage} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Utensils className="size-12" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-sm text-gray-600">
        {truncateText(description)}
      </CardContent>
    </Card>
  );
};
