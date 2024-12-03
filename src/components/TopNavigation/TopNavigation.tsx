import Image from "next/image";
import Link from "next/link";

import ExampleImage from "@/public/images/example-image.png";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { NotificationBox } from "@/components/notification-box/NotificationBox";

const TopNavigation = () => {
  const userName: string = "John Doe";
  return (
    <>
      <div className="relative">
        <div className="absolute top-3 left-3">
          <Image src={ExampleImage} alt="Example description" width={100} />
        </div>
        <div className="flex absolute top-3 right-3 space-x-2">
          <Link href="/shopping-list">
            <Image
              src={ShoppingBagIcon}
              alt="Shopping List"
              className="w-10 h-10"
            />
          </Link>
          {/* TO DO - open modal, small icon of how many alerts we have. */}
          <NotificationBox />
        </div>
      </div>
      <div className="absolute top-[60px] left-3">
        <h3>Hello, {userName}</h3>
      </div>
    </>
  );
};
export default TopNavigation;
