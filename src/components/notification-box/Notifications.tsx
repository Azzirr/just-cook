import { Fragment } from "react";

import { Notification } from "@/components/notification-box/Notification";
import type { Notification as NotificationType } from "@/components/notification-box/types";
import { Separator } from "@/components/ui/separator";

type Props = {
  notifications: NotificationType[];
};

export const Notifications = ({ notifications }: Props) => {
  return (
    <div className="p-1">
      {notifications.map((notification, index) => {
        const isLastNotification = index === notifications.length - 1;

        return (
          <Fragment key={index}>
            <Notification {...notification} />
            {!isLastNotification && <Separator className="my-2" />}
          </Fragment>
        );
      })}
    </div>
  );
};
