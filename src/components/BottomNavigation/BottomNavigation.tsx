import {
  House,
  Heart,
  ClipboardPlus,
  ShoppingBag,
  Bell,
  TriangleAlert,
  BookOpen,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { NotificationBox } from "@/components/notification-box/NotificationBox";
import { MoreMenu } from "@/components/MoreMenu/MoreMenu";
import { LogoutButton } from "@/components/MoreMenu/LogoutButton";

import { Link } from "@/i18n/routing";
import { currentSession } from "@/lib/currentSession";
import { getUserById } from "@/data/user";
import type { Notification } from "@/components/notification-box/types";

const notifications: Notification[] = [
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBag,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: TriangleAlert,
  },
  {
    title: "Rate recipe",
    body: "Rate the recipe you tried last week and help us improve.",
    redirectTo: "/recipes",
    Icon: BookOpen,
  },
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBag,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: TriangleAlert,
  },
  {
    title: "Rate recipe",
    body: "Rate the recipe you tried last week and help us improve.",
    redirectTo: "/recipes",
    Icon: BookOpen,
  },
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBag,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: TriangleAlert,
  },
];

const BottomNavigation = async () => {
  const t = await getTranslations("TopNavigation");
  const session = await currentSession();
  const hasNotifications = notifications.length > 0;

  return (
    <div className="sticky bottom-0 z-10 flex max-h-[68.55px] justify-between bg-slate-100 p-3">
      <Link href="/" className="flex flex-col items-center">
        <House className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("home")}</span>
      </Link>
      <Link href="/favourite-recipes" className="flex flex-col items-center">
        <Heart className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("favourites")}</span>
      </Link>
      <Link href="/new-recipe" className="flex flex-col items-center">
        <ClipboardPlus className="size-10" strokeWidth={1.5} />
        <span className="text-[12px]">{t("sendRecipe")}</span>
      </Link>
      <NotificationBox
        notifications={notifications}
        className="relative flex flex-col items-center"
      >
        <Bell className="size-10" strokeWidth={1.5} />
        {hasNotifications && (
          <div className="absolute bottom-5 right-4 size-4 rounded-full bg-indigo-600 text-xs text-slate-50">
            {notifications.length}
          </div>
        )}
        <span className="text-[12px]">Notifications</span>
      </NotificationBox>
      <MoreMenu>{session && <LogoutButton />}</MoreMenu>
    </div>
  );
};
export default BottomNavigation;
