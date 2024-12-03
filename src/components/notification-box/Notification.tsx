import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  body: string;
  redirectTo: string;
  Icon: string;
};

export const Notification = ({ title, body, redirectTo, Icon }: Props) => {
  return (
    <Link href={redirectTo} className="px-2 py-1 flex gap-2 items-start">
      <Image src={Icon} alt="Notifications Bell Icon" className="w-7" />
      <div>
        <h5 className="text-sm font-bold">{title}</h5>
        <p className="text-sm text-muted-foreground leading-tight">{body}</p>
      </div>
    </Link>
  );
};
