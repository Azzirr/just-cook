import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notifications } from "./Notifications";
import type { Notification } from "./types";

type NotificationBoxProps = {
  notifications: Notification[];
  children: ReactNode;
  className?: string;
};

export const NotificationBox = ({
  notifications,
  children,
  className,
}: NotificationBoxProps) => {
  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger className={className}>{children}</PopoverTrigger>
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
