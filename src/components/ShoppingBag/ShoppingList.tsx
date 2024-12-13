import { ScrollArea } from "@/components/ui/scroll-area";

import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { ShoppingListItem } from "@/components/ShoppingBag/ShoppingListItem";
import { type ShoppingListItem as ListItem } from "@/components/ShoppingBag/types";
import Image from "next/image";

/* TODO: Remove this section */
import Placeholder from "@/public/images/32.svg";
import Egg from "@/public/images/egg.png";
import Milk from "@/public/images/milk.png";

const itemsList: ListItem[] = [
  {
    name: "Eggs",
    quantity: 12,
    image: Egg,
    goTo: "/products/eggs",
    done: false,
  },
  {
    name: "Milk",
    quantity: 6,
    image: Milk,
    goTo: "/products/milk",
    done: false,
  },
  {
    name: "Flour",
    quantity: 2,
    image: Placeholder,
    goTo: "/products/flour",
    done: true,
  },
];

const emptyList: ListItem[] = [];
/* TODO: Remove this section */

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
