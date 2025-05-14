import {
  Recipe,
  RecipeComment as RecipeCommentPrisma,
  User,
} from "@prisma/client";

import { RecipeComment } from "./RecipeComment";
import { RecipeCommentForm } from "./RecipeCommentForm";

type Comment = RecipeCommentPrisma & { author: User };

type Props = {
  recipe: Recipe & {
    comments: Comment[];
  };
};

export const RecipeComments = ({ recipe }: Props) => {
  //TODO: handle pagination and edit comment

  return (
    <div>
      <p className="mb-3 text-xl font-medium">Comments</p>
      <RecipeCommentForm recipeId={recipe.id} />
      <div className="flex flex-col gap-3">
        {recipe.comments?.map((comment) => (
          <RecipeComment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
