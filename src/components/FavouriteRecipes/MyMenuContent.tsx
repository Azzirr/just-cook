"use client";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Undo2 } from "lucide-react";
import { Card } from "../ui/card";
const userMenus = [
  {
    name: "For later",
    id: 1,
    recipes: [
      { id: 3, name: "Spaghetti Carbonara" },
      { id: 4, name: "Grilled Cheese Sandwich" },
      { id: 5, name: "Chicken Alfredo" },
    ],
  },
  {
    name: "Best breakfast",
    id: 2,
    recipes: [
      { id: 8, name: "Pancakes with Maple Syrup" },
      { id: 9, name: "Avocado Toast" },
      { id: 10, name: "Breakfast Burrito" },
    ],
  },
  {
    name: "For my family",
    id: 3,
    recipes: [
      { id: 13, name: "Roast Chicken with Vegetables" },
      { id: 14, name: "Lasagna" },
      { id: 15, name: "Mac and Cheese" },
    ],
  },
  {
    name: "For later",
    id: 4,
    recipes: [
      { id: 3, name: "Spaghetti Carbonara" },
      { id: 4, name: "Grilled Cheese Sandwich" },
      { id: 5, name: "Chicken Alfredo" },
    ],
  },
  {
    name: "Best breakfast",
    id: 6,
    recipes: [
      { id: 8, name: "Pancakes with Maple Syrup" },
      { id: 9, name: "Avocado Toast" },
      { id: 10, name: "Breakfast Burrito" },
    ],
  },
  {
    name: "For my family",
    id: 7,
    recipes: [
      { id: 13, name: "Roast Chicken with Vegetables" },
      { id: 14, name: "Lasagna" },
      { id: 15, name: "Mac and Cheese" },
    ],
  },
];

const MyMenuContent = () => {
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
          {userMenus[0].name}
        </div>
      </div>

      {userMenus.map((menu, index) => (
        <Link href={`/favourite-recipes/${menu.id}`} key={menu.id}>
          <Card className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
            {/* TODO - recipes from current menu, db */}
            Recipes from choosed myMenu
          </Card>
        </Link>
      ))}
    </>
  );
};
export { MyMenuContent };
