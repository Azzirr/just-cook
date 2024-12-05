import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import MoreIcon from "@/public/icons/more.svg";
import HomeIcon from "@/public/icons/home.svg";
import FavouriteRecipesIcon from "@/public/icons/favourite-recipes.svg";

const BottomNavigation = () => {
  return (
    <>
      <div className="flex fixed bottom-3 left-3">
        <Link href="/">
          <Image src={HomeIcon} alt="Home Icon" className="w-10 h-10" />
        </Link>
      </div>
      <div className="flex fixed bottom-3 right-3 space-x-2">
        <Link href="/favourite-recipes">
          <Image
            src={FavouriteRecipesIcon}
            alt="Recipes Icon"
            className="w-10 h-10"
          />
        </Link>
        <Link href="/user">
          <Avatar>
            <AvatarImage
              src="https://i.pinimg.com/736x/7b/8c/d8/7b8cd8b068e4b9f80b4bcf0928d7d499.jpg"
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href="/more">
            <Image src={MoreIcon} alt="Alert Icon" className="w-10 h-10" />
          </Link>
        </div>
      </div>
    </>
  );
};
export default BottomNavigation;
