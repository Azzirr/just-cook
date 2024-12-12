import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import MoreIcon from "@/public/icons/more.svg";
import HomeIcon from "@/public/icons/home.svg";
import FavouriteRecipesIcon from "@/public/icons/favourite-recipes.svg";

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
            <AvatarImage
              src="https://i.pinimg.com/736x/7b/8c/d8/7b8cd8b068e4b9f80b4bcf0928d7d499.jpg"
              alt="User avatar"
              className="size-10"
            />
            <AvatarFallback>USER</AvatarFallback>
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
