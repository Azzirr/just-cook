import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FilePenLine } from "lucide-react";
import { UserProfileModalForm } from "./UserProfileModalForm";
import { User } from "@prisma/client";
import { currentSession } from "@/lib/currentSession";

type UserProfileHeaderButtonsProps = {
  user: User;
};

export const UserProfileHeaderButtons = async ({
  user,
}: UserProfileHeaderButtonsProps) => {
  const sessionUser = await currentSession();
  const isViewingOwnProfile = sessionUser?.id === user.id;

  return isViewingOwnProfile ? (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex w-14 flex-row items-center">
          <span className="text-[12px]">Edit profile</span>
          <FilePenLine strokeWidth={1.5} />
        </div>
      </DialogTrigger>
      <UserProfileModalForm user={user} />
    </Dialog>
  ) : (
    <Button>Follow</Button>
  );
};
