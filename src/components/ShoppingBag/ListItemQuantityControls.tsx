import { Plus, Minus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Ingredient } from "./types";

/*
Read about the accessibility approach here
https://lucide.dev/guide/advanced/accessibility#on-icon-buttons
*/

export const ListItemQuantityControls = ({ quantity }: Ingredient) => {
  const buttonClass = "[&_svg]:size-5";
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className={buttonClass}>
        <Minus />
        <span className="sr-only">Remove one of this item</span>
      </Button>

      <Button variant="ghost" size="icon" className={buttonClass}>
        <Plus />
        <span className="sr-only">Add one of this item</span>
      </Button>

      {/* TODO: change defaultValue to value */}
      <Input defaultValue={quantity} className="w-20" />

      <Button variant="ghost" size="icon" className={buttonClass}>
        <Trash2 />
        <span className="sr-only">Remove this item</span>
      </Button>
    </div>
  );
};
