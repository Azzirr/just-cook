import Image from "next/image";

import TrashIcon from "@/public/icons/trash.svg";
import MinusIcon from "@/public/icons/minus.svg";
import PlusIcon from "@/public/icons/plus.svg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { type ShoppingListItem as ListItem } from "./types";

export const ListItemQuantityControls = ({ quantity }: ListItem) => {
  return (
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
  );
};
