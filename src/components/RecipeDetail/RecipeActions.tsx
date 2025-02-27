import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

export const RecipeActions = () => {
  return (
    <section>
      <Button
        variant="ghost"
        className="size-10 rounded-full transition-all duration-150 hover:bg-red-100 hover:text-red-500 focus-visible:bg-red-100 focus-visible:text-red-500 active:scale-110"
      >
        <Heart className="size-6" />
        <span className="sr-only">Add recipe to favorites</span>
      </Button>
    </section>
  );
};
