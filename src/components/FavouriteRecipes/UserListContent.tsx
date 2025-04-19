"use client";
import { Recipe } from "@prisma/client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Link } from "@/i18n/routing";

import { Card } from "../ui/card";


interface UserListContentProps {
  userListContent: Recipe[];
}

const UserListContent = ({ userListContent }: UserListContentProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Undo2
          onClick={() => router.back()}
          strokeWidth={1.5}
          className="size-10 items-start"
        >
          Go back
        </Undo2>
      </div>

      {userListContent.map((recipe) => (
        <Card className="odd:bg-gray-100 even:bg-gray-200" key={recipe.id}>
          <Link href={`/recipes/${recipe.id}/${recipe.slug}`}>
            {recipe.name}
          </Link>
        </Card>
      ))}
    </>
  );
};
export { UserListContent };
