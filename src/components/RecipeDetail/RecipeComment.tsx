import { RecipeComment as RecipeCommentPrisma, User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatToShortDate } from "@/utils/formatToShortDate";
import { getUsernameInitials } from "@/utils/getUsernameInitials";

type RecipeCommentProps = { comment: RecipeCommentPrisma & { author: User } };

export const RecipeComment = async ({ comment }: RecipeCommentProps) => {
  const formatDate = await formatToShortDate();

  const { author, text, createdAt } = comment;
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-slate-50">
          <AvatarImage src={author.avatar ?? undefined} />
          <AvatarFallback>
            {getUsernameInitials(author.username)}
          </AvatarFallback>
        </Avatar>
        <p className="font-bold">{author.username}</p>
        <p className="text-xs">{formatDate(createdAt)}</p>
      </div>
      <div className="ml-[40px]">
        <p>{text}</p>
      </div>
    </div>
  );
};
