import { RecipeCategory } from "@prisma/client";
import { CategoriesPreviewElement } from "./CategoriesPreviewElement";

type CategoriesPreviewCardProps = { categories: RecipeCategory[] };

export const CategoriesPreviewCard = ({
  categories,
}: CategoriesPreviewCardProps) => {
  const SEE_MORE_ICON =
    "https://res.cloudinary.com/dqpm8hjgz/image/upload/c_thumb,w_200,g_face/v1743697684/more_eaezkq.png";

  return (
    <div className="relative">
      <div className="relative z-[10] grid grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-5 rounded-xl bg-[#ffffff] p-4 shadow-md">
        {categories.map((category) => (
          <CategoriesPreviewElement
            key={category.id}
            label={category.name}
            href={`/categories/${category.slug}`}
            icon={category.icon}
          ></CategoriesPreviewElement>
        ))}
        <CategoriesPreviewElement
          label={"See more"}
          href={`/categories`}
          icon={SEE_MORE_ICON}
        ></CategoriesPreviewElement>
      </div>
    </div>
  );
};
