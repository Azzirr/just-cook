import { Ellipsis } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type MoreMenuProps = {
  children?: ReactNode;
};

export async function MoreMenu({ children }: MoreMenuProps) {
  const t = await getTranslations("TopNavigation");

  return (
    <Popover>
      <PopoverTrigger className="flex flex-col items-center">
        <Ellipsis className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("more")}</span>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit min-w-52 flex-col gap-2">
        {children ?? (
          <p className="text-muted-foreground">
            No additional options available
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
