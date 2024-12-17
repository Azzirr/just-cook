import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";

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
//TODO: Async, get from DB
const CategoryList = ({ query }: { query: string }) => {
  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) => {
        return category.name.toLowerCase().includes(query.toLocaleLowerCase());
      })
    : [];

  return (
    <>
      {Array.isArray(categories) && categories.length === 0 && (
        <p className="mx-auto text-lg text-red-700">No categories found...</p>
      )}
      {Array.isArray(categories) &&
        filteredCategories.map((category: any) => (
          <Button
            key={category.name}
            asChild
            variant="secondary"
            className="rounded-3xl text-lg"
          >
            <Link href={`/category/${category.href}`}>{category.name}</Link>
          </Button>
        ))}
    </>
  );
};

export default CategoryList;
