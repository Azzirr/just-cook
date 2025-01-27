import { Checkbox } from "@/components/ui/checkbox";

import { Ingredient } from "./types";

export const ListItemHead = ({ name }: Ingredient) => {
  return (
    <label className="flex grow cursor-pointer items-center gap-2">
      <Checkbox className="peer size-5" />
      <h4 className="text-lg font-bold peer-aria-checked:text-secondary-foreground peer-aria-checked:line-through">
        {name}
      </h4>
    </label>
  );
};
