import {
  Recipe,
  RecipeComment as RecipeCommentPrisma,
  User,
} from "@prisma/client";

import { currentSession } from "@/lib/currentSession";

import { RecipeComment } from "./RecipeComment";
import { RecipeCommentForm } from "./RecipeCommentForm";

type Comment = RecipeCommentPrisma & { author: User };

type Props = {
  recipe: Recipe & {
    comments: Comment[];
  };
};

export const RecipeComments = async ({ recipe }: Props) => {
  //TODO: handle pagination and edit comment
  const session = await currentSession();

  return (
    <div>
      <p className="mb-3 text-xl font-medium">Comments</p>
      {session && <RecipeCommentForm recipeId={recipe.id} />}
      <div className="flex flex-col gap-3">
        {recipe.comments?.map((comment) => (
          <RecipeComment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
