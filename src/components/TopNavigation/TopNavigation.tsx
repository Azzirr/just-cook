import Image from "next/image";

import ExampleImage from "@/public/images/example-image.png";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { NotificationBox } from "@/components/notification-box/NotificationBox";

import { Link } from "@/i18n/routing";

const TopNavigation = () => {
  const userName: string = "John Doe";
  return (
    <div className="sticky top-0 flex w-full items-center justify-between p-3">
      <Image src={ExampleImage} alt="Example description" width={100} />
      <div className="flex items-center gap-3">
        <Link href="/shopping-list">
          <Image src={ShoppingBagIcon} alt="Shopping List" className="w-10" />
        </Link>
        <NotificationBox />
      </div>
    </div>
  );
};
export default TopNavigation;
