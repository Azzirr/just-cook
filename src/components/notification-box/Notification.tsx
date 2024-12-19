import { Link } from "@/i18n/routing";
import type { Notification as NotificationType } from "./types";

type Props = NotificationType;

export const Notification = ({ title, body, redirectTo, Icon }: Props) => {
  return (
    <Link href={redirectTo} className="flex items-start gap-2 px-2 py-1">
      <Icon className="size-8" strokeWidth={1.5} />
      <div>
        <h5 className="text-sm font-bold">{title}</h5>
        <p className="text-sm leading-tight text-muted-foreground">{body}</p>
      </div>
    </Link>
  );
};
