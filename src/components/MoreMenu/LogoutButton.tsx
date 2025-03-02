"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/logout";
import { useRouter } from "@/i18n/routing";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const { isSuccess, message } = await logOut();
      router.refresh();
      isSuccess ? toast.success(message) : toast.error(message);
    });
  }

  return (
    <Button
      className="flex items-center gap-2"
      onClick={handleClick}
      disabled={isPending}
    >
      <LogOut className="size-6" strokeWidth={1.5} />
      <span>{isPending ? "Logging Out..." : "Log Out"}</span>
    </Button>
  );
}
