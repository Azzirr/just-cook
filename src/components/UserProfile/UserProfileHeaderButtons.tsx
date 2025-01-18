import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePenLine } from "lucide-react";

export const UserProfileHeaderButtons = (props: { thisUser: boolean }) => {
  return props.thisUser ? (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-14 flex-row items-center">
          <span className="text-[12px]">Edit profile</span>
          <FilePenLine strokeWidth={1.5} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <p>Pretend you see a form here</p>
      </DialogContent>
    </Dialog>
  ) : (
    <Button>Follow</Button>
  );
};
