import { getCategories } from "@/actions/categories/getCategories";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";
import { RecipeCategory } from "@prisma/client";

// TODO - delete this and uncomment code from 28 line
const categories = [
  { id: 1, name: "DESSERTS 🍰", href: "/desserts" },
  { id: 2, name: "MAIN-DISHES 🍽️", href: "/main-dishes" },
  { id: 3, name: "APPETIZERS 🧀", href: "/appetizers" },
  { id: 4, name: "SALADS 🥗", href: "/salads" },
  { id: 5, name: "SOUPS 🍲", href: "/soups" },
  { id: 6, name: "BREAKFAST 🍳", href: "/breakfast" },
  { id: 7, name: "BEVERAGES 🧃", href: "/beverages" },
  { id: 8, name: "SNACKS 🍿", href: "/snacks" },
  { id: 9, name: "SAUCES 🍯", href: "/sauces" },
  { id: 10, name: "BREADS 🥖", href: "/breads" },
  { id: 11, name: "SEAFOOD 🦞", href: "/seafood" },
  { id: 12, name: "VEGETARIAN 🥦", href: "/vegetarian" },
  { id: 13, name: "GRILLED 🍖", href: "/grilled" },
  { id: 14, name: "HOLIDAY-SPECIALS 🎄", href: "/holiday-specials" },
  { id: 15, name: "KIDS-MENU 🍔", href: "/kids-menu" },
];

const CategoryList = async ({ query }: { query: string }) => {
  // TODO - uncomment this, it's a default code
  // const categories = await getCategories();

  const filteredCategories = (categories || []).filter((category) => {
    return category.name.toLowerCase().includes(query.toLocaleLowerCase());
  });

  return (
    <>
      {filteredCategories.length === 0 && (
        <p className="mx-auto text-lg text-red-700">No categories found...</p>
      )}
      {filteredCategories.map((category: RecipeCategory) => (
        <Button
          key={category.id}
          asChild
          variant="secondary"
          className="rounded-3xl text-lg"
        >
          <Link href={`/category/${category.id}`}>{category.name}</Link>
        </Button>
      ))}
    </>
  );
};

export default CategoryList;
