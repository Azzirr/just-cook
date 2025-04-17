import { Ingredient } from "@prisma/client";

import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  name: Ingredient["name"];
};

export const ListItemHead = ({ name }: Props) => {
  return (
    <label className="flex grow cursor-pointer items-center gap-2">
      <Checkbox className="peer size-5" />
      <h4 className="text-lg font-bold peer-aria-checked:text-secondary-foreground peer-aria-checked:line-through">
        {name}
      </h4>
    </label>
  );
};
