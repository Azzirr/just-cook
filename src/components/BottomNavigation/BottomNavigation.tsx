import Image from "next/image";

import MoreIcon from "@/public/icons/more.svg";
import HomeIcon from "@/public/icons/home.svg";
import FavouriteRecipesIcon from "@/public/icons/favourite-recipes.svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "@/i18n/routing";

const BottomNavigation = () => {
  return (
    <div className="sticky bottom-0 flex justify-between bg-slate-100 p-3">
      <Link href="/">
        <Image src={HomeIcon} alt="Home Icon" className="size-10" />
      </Link>
      <div className="flex gap-3">
        <Link href="/favourite-recipes">
          <Image
            src={FavouriteRecipesIcon}
            alt="Recipes Icon"
            className="size-10"
          />
        </Link>
        <Link href="/user">
          <Avatar>
            <AvatarImage className="size-10" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Link>
        <Link href="/more">
          <Image src={MoreIcon} alt="Alert Icon" className="size-10" />
        </Link>
      </div>
    </div>
  );
};
export default BottomNavigation;
