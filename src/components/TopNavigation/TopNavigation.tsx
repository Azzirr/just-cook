import Image from "next/image";
import { CircleUserRound, ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";

import ExampleImage from "@/public/images/example-image.png";
import { Link } from "@/i18n/routing";
import { currentSession } from "@/lib/currentSession";
import { getUserById } from "@/data/user";

export const TopNavigation = async () => {
  const t = await getTranslations("TopNavigation");
  const session = await currentSession();
  const user = session?.id ? await getUserById(session.id) : null;

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-slate-100 px-3 py-1">
      <Link href="/">
        <Image src={ExampleImage} alt="Example description" className="w-32" />
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/shopping-bag">
          <ShoppingBag className="size-8" strokeWidth={1.5} />
          <span className="sr-only">Shopping Bag</span>
        </Link>
        <Link href={user ? `/user/${user.username}` : "/auth-user"}>
          <CircleUserRound className="size-8" strokeWidth={1.5} />
          <span className="sr-only">
            {user ? t("user") : "Log in or sign up"}
          </span>
        </Link>
      </div>
    </div>
  );
};
