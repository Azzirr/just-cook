import { Recipe } from "@prisma/client";
import { Utensils } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";

export type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { name, description, images } = recipe;
  const recipeImage = images[0];

  //TODO: test line-clamp in all browsers if it works
  return (
    <Card className="my-[7px] h-[310px] w-64 cursor-pointer overflow-hidden rounded-2xl shadow-md">
      <Link href={`/recipes/${recipe.id}/${recipe.slug}`}>
        <article className="block">
          <div className="relative h-40 w-full">
            {recipeImage ? (
              <Image
                src={recipeImage}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Utensils className="size-12" strokeWidth={1.5} />
              </div>
            )}
          </div>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="line-clamp-2 text-lg font-semibold">
              {name}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 text-sm text-gray-600">
            <div className="line-clamp-3">{description}</div>
          </CardContent>
        </article>
      </Link>
    </Card>
  );
};
