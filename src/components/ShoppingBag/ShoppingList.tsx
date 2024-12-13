import { useTranslations } from "next-intl";
import { ShoppingBagIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ShoppingListItem } from "@/components/ShoppingBag/ShoppingListItem";

/* TODO: Remove this placeholder */
import { placeholderItemsList, emptyList } from "./DELETEMEPlaceholder";
const itemsList = placeholderItemsList;

export const ShoppingBag = () => {
  const t = useTranslations("ShoppingBag");

  return (
    <>
      {itemsList.length === 0 ? (
        <div className="flex flex-col content-center items-center justify-center gap-4 px-2 py-1">
          <ShoppingBagIcon size={100} className="m-4" />
          <p>{t("isEmpty")}</p>
        </div>
      ) : (
        <ScrollArea className="px-2 py-1">
          <div className="flex flex-col gap-2">
            {itemsList.map((item, index) => (
              <ShoppingListItem key={index} {...item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};
