import { ScrollArea } from "@/components/ui/scroll-area";

import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { ShoppingListItem } from "@/components/ShoppingBag/ShoppingListItem";
import Image from "next/image";

/* TODO: Remove this placeholder */
import { placeholderItemsList, emptyList } from "./DELETEMEPlaceholder";
const itemsList = placeholderItemsList;

export const ShoppingBag = () => {
  return (
    <>
      {itemsList.length === 0 ? (
        <div className="flex flex-col content-center items-center justify-center gap-4 px-2 py-1">
          <Image src={ShoppingBagIcon} alt="Shopping bag" className="w-20" />
          <p>Shopping bag is empty</p>
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
