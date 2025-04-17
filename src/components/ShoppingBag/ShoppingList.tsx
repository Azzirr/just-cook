// "use client";

import { ShoppingBagIcon } from "lucide-react";

import type { Ingredient } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingListItem } from "@/components/ShoppingBag/ShoppingListItem";
import { getShoppingList } from "@/actions/shopping-bag/getShoppingList";
import { currentSession } from "@/lib/currentSession";

export const ShoppingBag = async () => {
  // const t = useTranslations("ShoppingBag");

  const session = await currentSession();
  const userId = session?.id;
  const shoppingBagItems = userId ? await getShoppingList({ userId }) : [];

  // TODO: Implement local storage
  // const shoppingBagItems: Ingredient[] = userId
  //   ? shoppingBagDB
  //   : JSON.parse(localStorage?.getItem("just-cook-shopping-bag") ?? "[]");
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
