import { useTranslations } from "next-intl";

import { ShoppingBag } from "@/components/ShoppingBag/ShoppingList";

const shoppingList = () => {
  const t = useTranslations("ShoppingBag");

  return (
    <div className="mx-auto max-w-[500px] py-5">
      <h2 className="px-4 py-2 font-bold">{t("title")}</h2>
      <ShoppingBag />
    </div>
  );
};

export default shoppingList;
