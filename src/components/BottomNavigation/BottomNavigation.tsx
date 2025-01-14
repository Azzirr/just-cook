import {
  Ellipsis,
  House,
  Heart,
  ClipboardPlus,
  CircleUserRound,
} from "lucide-react";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const BottomNavigation = () => {
  const t = useTranslations("TopNavigation");
  return (
    <div className="sticky bottom-0 z-10 flex max-h-[68.55px] justify-between bg-slate-100 p-3">
      <Link href="/" className="flex flex-col items-center">
        <House className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("home")}</span>
      </Link>
      <Link href="/new-recipe" className="flex flex-col items-center">
        <ClipboardPlus className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("sendRecipe")}</span>
      </Link>
      <Link href="/favourite-recipes" className="flex flex-col items-center">
        <Heart className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("favourites")}</span>
      </Link>
      <Link href="/user" className="flex flex-col items-center">
        <CircleUserRound className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("user")}</span>
      </Link>
      <Link href="/more" className="flex flex-col items-center">
        <Ellipsis className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("more")}</span>
      </Link>
    </div>
  );
};
export default BottomNavigation;
