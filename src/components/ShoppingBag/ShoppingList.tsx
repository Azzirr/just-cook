import { ScrollArea } from "@/components/ui/scroll-area";

import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { CartItem } from "@/components/ShoppingBag/ShoppingListItem";
import { type ShoppingListItem as ListItem } from "@/components/ShoppingBag/types";
import Image from "next/image";

const itemsList: ListItem[] = [
  {
    name: "Eggs",
    quantity: 12,
    goTo: "/products/eggs",
    done: false,
  },
  {
    name: "Milk",
    quantity: 6,
    goTo: "/products/milk",
    done: false,
  },
  {
    name: "Flour",
    quantity: 2,
    goTo: "/products/flour",
    done: true,
  },
];

// ! Remove this
const emptyList: ListItem[] = [];

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
              <CartItem key={index} {...item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};
