import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";

import { type ShoppingListItem as ListItem } from "./types";

export const ListItemHead = ({ name, image, goTo, done }: ListItem) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={done} className="h-5 w-5" />

      <Link href={goTo} className="flex flex-row items-center gap-2">
        <Image src={image} alt={name} width={28} height={28} />
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
  );
};
