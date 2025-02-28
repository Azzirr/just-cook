import { getCategories } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";
import { RecipeCategory } from "@prisma/client";

const CategoryList = async ({ query }: { query: string }) => {
  const categories = await getCategories();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <>
      {filteredCategories.length === 0 ? (
        <p className="mx-auto text-lg text-red-700">No categories found...</p>
      ) : (
        filteredCategories.map((category: RecipeCategory) => (
          <Button
            key={category.id}
            asChild
            variant="secondary"
            className="rounded-3xl text-lg"
          >
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          </Button>
        ))
      )}
    </>
  );
};

export default CategoryList;
