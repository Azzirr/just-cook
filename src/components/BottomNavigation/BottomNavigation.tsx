import { Ellipsis, House, Heart, ClipboardPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "@/i18n/routing";

const BottomNavigation = () => {
  return (
    <div className="sticky bottom-0 flex justify-between bg-slate-100 p-3">
      <Link href="/">
        <House className="size-10" strokeWidth={1.5} />
      </Link>
      <div className="flex gap-3">
        {/* TODO - there is a space for one more item */}
        <Link href="/new-recipe">
          <ClipboardPlus className="size-10" strokeWidth={1.5} />
        </Link>
        <Link href="/favourite-recipes">
          <Heart className="size-10" strokeWidth={1.5} />
        </Link>
        <Link href="/user">
          <Avatar>
            <AvatarImage className="size-10" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Link>
        <Link href="/more">
          <Ellipsis className="size-10" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
};
export default BottomNavigation;
