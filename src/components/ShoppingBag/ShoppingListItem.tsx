import { ListItemHead } from "./ListItemHead";
import { ListItemQuantityControls } from "./ListItemQuantityControls";

import type { Ingredient } from "./types";

export const ShoppingListItem = (props: Ingredient) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-2 py-1">
      <ListItemHead {...props} />
      <ListItemQuantityControls {...props} />
    </div>
  );
};
