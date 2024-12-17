import Placeholder from "@/public/images/32.svg";
import Egg from "@/public/images/egg.png";
import Milk from "@/public/images/milk.png";

import { type ShoppingListItem as ListItem } from "@/components/ShoppingBag/types";

export const placeholderItemsList: ListItem[] = [
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

export const emptyList: ListItem[] = [];
