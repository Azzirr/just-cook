import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

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

  const t = useTranslations("Categories");

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex max-h-[75vh] w-[100vw] flex-col items-center overflow-y-auto bg-gray-100 p-4">
          <h1 className="mb-4 text-2xl font-bold">{t("heading")}</h1>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex justify-center">
                <Link href={`/category/${category.href}`}>
                  <Button className="w-[70vw] rounded-3xl bg-gray-900">
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
