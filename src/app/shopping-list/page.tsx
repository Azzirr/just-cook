import { ScrollArea } from "@/components/ui/scroll-area";

import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { CartItem } from "@/components/ShoppingCart/CartItem";
import { type CartItem as CartItemType } from "@/components/ShoppingCart/types";
import Image from "next/image";

const itemsList: CartItemType[] = [
  {
    name: "Eggs",
    quantity: 12,
    goTo: "/products/eggs",
    done: false,
  },
  {
    name: "Milk",
    quantity: 2,
    goTo: "/products/milk",
    done: false,
  },
];

const emptyList = [];

const shoppingList = () => {
  return (
    <>
      {itemsList.length === 0 ? (
        <div className="flex flex-col content-center items-center justify-center gap-4 px-2 py-1">
          <Image src={ShoppingBagIcon} alt="Shopping bag" className="w-20" />
          <p>Shopping bag is empty</p>
        </div>
      ) : (
        <>
          <h2 className="px-4 py-2 font-bold">Shopping cart</h2>
          <ScrollArea className="px-2 py-1">
            <div className="flex flex-col gap-2">
              {itemsList.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default shoppingList;
