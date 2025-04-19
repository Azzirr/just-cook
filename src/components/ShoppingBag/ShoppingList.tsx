"use client";

import type { Ingredient } from "@prisma/client";
import { ShoppingBagIcon } from "lucide-react";

import { ShoppingListItem } from "@/components/ShoppingBag/ShoppingListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

// TODO: Fetch actual data from db and bring back ssr and translations
export const ShoppingBag = () => {
  // const t = useTranslations("ShoppingBag");

  const shoppingBagItems: Ingredient[] = JSON.parse(
    localStorage.getItem("just-cook-shopping-bag") ?? "[]",
  );
  const isShoppingBagEmpty = shoppingBagItems.length === 0;

  return (
    <>
      {isShoppingBagEmpty ? (
        <div className="flex flex-col content-center items-center justify-center gap-4 px-2 py-1">
          <ShoppingBagIcon size={100} className="m-4" />
          <p>
            {/* {t("isEmpty")} */}
            Your shopping bag is empty
          </p>
        </div>
      ) : (
        <ScrollArea className="px-2 py-1">
          <div className="flex flex-col gap-2">
            {shoppingBagItems.map((item, index) => (
              <ShoppingListItem key={index} ingredient={item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};
