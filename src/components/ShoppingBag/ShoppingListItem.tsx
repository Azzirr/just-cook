import { type ShoppingListItem as ListItem } from "./types";
import { ListItemHead } from "./ListItemHead";
import { ListItemQuantityControls } from "./ListItemQuantityControls";

export const ShoppingListItem = (props: ListItem) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1">
      <ListItemHead {...props} />
      <ListItemQuantityControls {...props} />
    </div>
  );
};
