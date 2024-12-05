import Image from "next/image";
import Link from "next/link";

import TrashIcon from "@/public/icons/trash.svg";

import { type CartItem as CartItemProps } from "./types";
import { Input } from "@/components/ui/input";

export const CartItem = ({ name, quantity, goTo }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1">
      <Link href={goTo}>
        <h4 className="text-lg font-bold">{name}</h4>
      </Link>
      <div className="flex gap-2">
        <Input defaultValue={quantity} className="w-[80px]" />
        <Image src={TrashIcon} alt="Delete item" className="cursor-pointer" />
      </div>
      {/* TODO: change defaultValue to value */}
    </div>
  );
};
