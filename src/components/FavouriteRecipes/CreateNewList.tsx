"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { ListPlusIcon } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../ui-custom/LoadingSpinner";
import { createRecipeList } from "@/actions/favourite-list-actions/mutations";

async function handleCreateList(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;

  const result = await createRecipeList(name);
  if (result) {
    toast(`${name} was created!`);
  }

  return;
}

export const CreateNewList = () => {
  const [state, formAction, isPending] = useActionState(handleCreateList, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <ListPlusIcon className="mb-4 mr-5 size-8 cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create new list</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
