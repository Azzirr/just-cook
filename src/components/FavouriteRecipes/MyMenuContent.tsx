"use client";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Undo2 } from "lucide-react";
import { Card } from "../ui/card";

const MyMenuContent = ({ userListContent }: any) => {
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
        <div className="w-[90vw] items-center justify-center">
          {userListContent.name}
        </div>
      </div>

      {userListContent.map((recipe: any, index: number) => (
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
export { MyMenuContent };
