import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  async function logOut() {
    "use server";
    await signOut();
  }

  return (
    <Button className="flex items-center gap-2" onClick={logOut}>
      <LogOut className="size-6" strokeWidth={1.5} />
      <span>Log Out</span>
    </Button>
  );
}
