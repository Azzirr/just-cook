import { Link } from "@/i18n/routing";
import { Card, CardHeader } from "../ui/card";
import { MyMenuElement } from "./MyMenuElement";

const MyMenu = () => {
  //TODO - delete this and get menu "playlists" from  database
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

  return (
    <>
      {userMenus.map((menu, index) => (
        //TODO - fix redirect
        <Link href={`/favourite-recipes/${menu.id}`} key={menu.id}>
          <MyMenuElement recipe={menu} index={index} />
        </Link>
      ))}
    </>
  );
};
export { MyMenu };
