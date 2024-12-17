import { useTranslations } from "next-intl";
import SearchBar from "../ui-custom/SearchBar";
import CategoryList from "./CategoryList";

const Category = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const t = useTranslations("Categories");
  const query: string = searchParams?.query || "";

  return (
    <div className="mx-auto max-w-96 py-5">
      <div className="mx-5">
        <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
        <SearchBar className="my-5" />
        <div className="flex flex-col gap-4">
          <CategoryList query={query} />
        </div>
      </div>
    </div>
  );
};

export default Category;
