import Image from "next/image";
import Link from "next/link";

import ExampleImage from "@/public/images/example-image.png";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";

import { NotificationBox } from "@/components/notification-box/NotificationBox";

const TopNavigation = () => {
  const userName: string = "John Doe";
  return (
    <>
      <div className="flex">
        <div className="fixed left-3 top-3">
          <Image src={ExampleImage} alt="Example description" width={100} />
        </div>
        <div className="fixed right-3 top-3 flex space-x-2">
          <Link href="/shopping-list">
            <Image
              src={ShoppingBagIcon}
              alt="Shopping List"
              className="h-10 w-10"
            />
          </Link>
          <NotificationBox />
        </div>
      </div>
      <div className="fixed left-3 top-[60px]">
        <h3>Hello, {userName}</h3>
      </div>
    </>
  );
};
export default TopNavigation;
