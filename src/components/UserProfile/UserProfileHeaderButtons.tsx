import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const UserProfileHeaderButtons = (props: { thisUser: boolean }) => {
  return props.thisUser ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
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
