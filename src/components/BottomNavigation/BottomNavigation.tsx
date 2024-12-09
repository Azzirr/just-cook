import Image from "next/image";

import MoreIcon from "@/public/icons/more.svg";
import HomeIcon from "@/public/icons/home.svg";
import FavouriteRecipesIcon from "@/public/icons/favourite-recipes.svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "@/i18n/routing";

const BottomNavigation = () => {
  return (
    <>
      <div className="fixed bottom-3 left-3 flex">
        <Link href="/">
          <Image src={HomeIcon} alt="Home Icon" className="h-10 w-10" />
        </Link>
      </div>
      <div className="fixed bottom-3 right-3 flex space-x-2">
        <Link href="/favourite-recipes">
          <Image
            src={FavouriteRecipesIcon}
            alt="Recipes Icon"
            className="h-10 w-10"
          />
        </Link>
        <Link href="/user">
          <Avatar>
            <AvatarImage
              src="https://i.pinimg.com/736x/7b/8c/d8/7b8cd8b068e4b9f80b4bcf0928d7d499.jpg"
              alt="User avatar"
              className="h-10 w-10 rounded-full"
            />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href="/more">
            <Image src={MoreIcon} alt="Alert Icon" className="h-10 w-10" />
          </Link>
        </div>
      </div>
    </>
  );
};
export default BottomNavigation;
