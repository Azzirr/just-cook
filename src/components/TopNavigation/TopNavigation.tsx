import Image from "next/image";
import ExampleImage from "@/public/images/example-image.png";
import AlertIcon from "@/public/icons/alert.svg";
import ShoppingListIcon from "@/public/icons/shopping-list.svg";
import Link from "next/link";

const TopNavigation = () => {
  const userName: string = "John Doe";
  return (
    <>
      <div className="flex">
        <div className="fixed top-3 left-3">
          <Image src={ExampleImage} alt="Example description" width={100} />
        </div>
        <div className="flex fixed top-3 right-3 space-x-2">
          <div>
            <Link href="/shopping-list">
              <Image
                src={ShoppingListIcon}
                alt="Shopping List"
                className="w-10 h-10"
              />
            </Link>
          </div>
          <div>
            {/* TO DO - open modal, small icon of how many alerts we have. */}
            <Image src={AlertIcon} alt="Alert Icon" className="w-10 h-10" />
          </div>
        </div>
      </div>
      <div className="fixed top-[60px] left-3">
        <h3>Hello, {userName}</h3>
      </div>
    </>
  );
};
export default TopNavigation;
