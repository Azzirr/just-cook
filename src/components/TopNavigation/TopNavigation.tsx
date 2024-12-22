import Image from "next/image";

import ExampleImage from "@/public/images/example-image.png";
import { ShoppingBag } from "lucide-react";

import { NotificationBox } from "@/components/notification-box/NotificationBox";

import { Link } from "@/i18n/routing";

const TopNavigation = () => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-slate-100 px-3 py-1">
      <Image src={ExampleImage} alt="Example description" className="w-32" />
      <div className="flex items-center gap-3">
        <Link href="/shopping-bag">
          <ShoppingBag className="size-10" strokeWidth={1.5} />
        </Link>
        <NotificationBox />
      </div>
    </div>
  );
};
export default TopNavigation;
