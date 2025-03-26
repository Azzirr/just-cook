import type { Ingredient } from "@prisma/client";

import { ListItemHead } from "./ListItemHead";
import { ListItemQuantityControls } from "./ListItemQuantityControls";

type Props = {
  ingredient: Ingredient;
};

export const ShoppingListItem = ({ ingredient }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-2 py-1">
      <ListItemHead name={ingredient.name} />
      <ListItemQuantityControls quantity={ingredient.quantity} />
    </div>
  );
};
