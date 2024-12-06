import Image from "next/image";

import WarningIcon from "@/public/icons/warning.svg";
import BookIcon from "@/public/icons/book.svg";
import BellIcon from "@/public/icons/bell.svg";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notifications } from "./Notifications";

import type { Notification } from "./types";

const notifications: Notification[] = [
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBagIcon,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: WarningIcon,
  },
  {
    title: "Rate recipe",
    body: "Rate the recipe you tried last week and help us improve.",
    redirectTo: "/recipes",
    Icon: BookIcon,
  },
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBagIcon,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: WarningIcon,
  },
  {
    title: "Rate recipe",
    body: "Rate the recipe you tried last week and help us improve.",
    redirectTo: "/recipes",
    Icon: BookIcon,
  },
  {
    title: "New Recipe",
    body: "Check out our new recipe for a delicious meal!",
    redirectTo: "/recipes",
    Icon: ShoppingBagIcon,
  },
  {
    title: "Verify your account",
    body: "Please verify your account to continue using our services.",
    redirectTo: "/account",
    Icon: WarningIcon,
  },
];

export const NotificationBox = () => {
  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Image
          src={BellIcon}
          alt="Notifications Bell Icon"
          className="size-10"
        />
        {hasNotifications && (
          <div className="absolute bottom-0 right-0 size-4 rounded-full bg-indigo-600 text-xs text-slate-50">
            {notifications.length}
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="mx-2 p-1">
        {hasNotifications ? (
          <ScrollArea className="flex max-h-[40vh] flex-col">
            <Notifications notifications={notifications} />
          </ScrollArea>
        ) : (
          <div className="py-3 text-center">You have no new notifications</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
