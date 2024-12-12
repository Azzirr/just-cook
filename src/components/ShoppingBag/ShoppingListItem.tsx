import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import TrashIcon from "@/public/icons/trash.svg";
import MinusIcon from "@/public/icons/minus.svg";
import PlusIcon from "@/public/icons/plus.svg";

import { type ShoppingListItem as ListItem } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const CartItem = ({ name, quantity, goTo, done }: ListItem) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1">
      <div className="flex items-center gap-2">
        <Checkbox checked={done} className="h-5 w-5" />
        <Link href={goTo}>
          <h4
            className={cn(
              "text-lg font-bold",
              done && "text-secondary-foreground line-through",
            )}
          >
            {name}
          </h4>
        </Link>
      </div>

      <div className="flex gap-2">
        {/* TODO: maybe clean this up? */}
        <Button variant="ghost" size="icon">
          <Image src={MinusIcon} alt="Remove one of this item" />
        </Button>

        <Button variant="ghost" size="icon">
          <Image src={PlusIcon} alt="Add one of this item" />
        </Button>

        {/* TODO: change defaultValue to value */}
        <Input defaultValue={quantity} className="w-[80px]" />

        <Button variant="ghost" size="icon">
          <Image src={TrashIcon} alt="Delete item" />
        </Button>
      </div>
    </div>
  );
};
