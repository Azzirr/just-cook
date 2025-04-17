import Image from "next/image";

import { Link } from "@/i18n/routing";

type CategoriesPreviewElementProps = {
  label: string;
  href: string;
  icon?: string | null;
};

export const CategoriesPreviewElement = ({
  label,
  href,
  icon,
}: CategoriesPreviewElementProps) => {
  const DEFAULT_ICON =
    "https://res.cloudinary.com/dqpm8hjgz/image/upload/c_thumb,w_200,g_face/v1743664788/breakfast_1_aeh16v.png";

  return (
    <Link
      className={"relative mx-auto flex flex-col items-center justify-center"}
      href={href}
    >
      <div className="relative h-[40px] w-[40px]">
        <Image
          alt="icon"
          className="rounded-md object-cover"
          fill
          src={icon || DEFAULT_ICON}
         />
      </div>
      {label}
    </Link>
  );
};
