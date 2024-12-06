import Link from "next/link";
import { Button } from "../ui/button";

// TODO - get categories from database, think about categories we want
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

const Category = () => {
  return (
    <div className="mx-auto max-w-96 py-5">
      <h1 className="mb-4 text-2xl font-bold">Categories</h1>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            asChild
            variant="secondary"
            className="rounded-3xl text-lg"
          >
            <Link href={`/category/${category.href}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Category;
