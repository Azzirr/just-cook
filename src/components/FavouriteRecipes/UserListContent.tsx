"use client";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Undo2 } from "lucide-react";
import { Card } from "../ui/card";
import { Recipe } from "@prisma/client";

interface userListContentProps {
  userListContent: Recipe[];
}

const UserListContent = ({ userListContent }: userListContentProps) => {
  const router = useRouter();
  console.log(userListContent);
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

      {userListContent.map((recipe, index) => (
        <Card
          className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
          key={index}
        >
          <Link href={`/recipes/${recipe.id}/${recipe.slug}`}>
            {recipe.name}
          </Link>
        </Card>
      ))}
    </>
  );
};
export { UserListContent };
