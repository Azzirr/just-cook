import Image from "next/image";

import ExampleImage from "@/public/images/example-image.png";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { NotificationBox } from "@/components/notification-box/NotificationBox";

import { Link } from "@/i18n/routing";

const TopNavigation = () => {
  const userName = "John Doe";

  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-slate-100 px-3 py-1">
      <Image src={ExampleImage} alt="Example description" className="w-32" />
      <div className="flex items-center gap-3">
        <Link href="/shopping-bag">
          <Image src={ShoppingBagIcon} alt="Shopping Bag" className="size-10" />
        </Link>
        <NotificationBox />
      </div>
    </div>
  );
};
export default TopNavigation;
