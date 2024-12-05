import Link from "next/link";
import { Button } from "../ui/button";

const Category = () => {
  // TO DO - get categories from database, think about categories we want
  const categories = [
    { name: "DESSERTS 🍰", href: "/desserts" },
    { name: "MAIN-DISHES 🍽️", href: "/main-dishes" },
    { name: "APPETIZERS 🧀", href: "/appetizers" },
    { name: "SALADS 🥗", href: "/salads" },
    { name: "SOUPS 🍲", href: "/soups" },
    { name: "BREAKFAST 🍳", href: "/breakfast" },
    { name: "BEVERAGES 🧃", href: "/beverages" },
    { name: "SNACKS 🍿", href: "/snacks" },
    { name: "SAUCES 🍯", href: "/sauces" },
    { name: "BREADS 🥖", href: "/breads" },
    { name: "SEAFOOD 🦞", href: "/seafood" },
    { name: "VEGETARIAN 🥦", href: "/vegetarian" },
    { name: "GRILLED 🍖", href: "/grilled" },
    { name: "HOLIDAY-SPECIALS 🎄", href: "/holiday-specials" },
    { name: "KIDS-MENU 🍔", href: "/kids-menu" },
  ];

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center  max-h-[75vh] w-[100vw] bg-gray-100 p-4 overflow-y-auto">
          <h1 className="mb-4 text-2xl font-bold">Categories</h1>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex justify-center">
                <Link href={`/category/${category.href}`}>
                  <Button className="w-[70vw] bg-gray-900 rounded-3xl">
                    {category.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Category;
