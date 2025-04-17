import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Dispatch, SetStateAction } from "react";
import { addRecipeToList } from "@/actions/allFavouriteListActions";
import type { RecipeList } from "@prisma/client";

type RecipePageDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId?: string;
  userLists: RecipeList[];
};

export const RecipePageDialog = ({
  isOpen,
  setOpen,
  userLists,
}: RecipePageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose your list</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center sm:text-left">
          Add recipe to list, using plus icon
        </DialogDescription>
        <ScrollArea className="max-h-[70vh] py-5">
          {userLists.length === 0 ? (
            <p>No lists found.</p>
          ) : (
            userLists.map((list: RecipeList, index: number) => (
              <div
                key={index}
                className="mr-5 flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <h4 className="text-[16px]">{list.name}</h4>
                <Button
                  variant="ghost"
                  className="my-2 rounded-full border border-gray-300 p-2 hover:bg-gray-100"
                  //TODO - change "1" to real recipe id
                  onClick={() => addRecipeToList(1, list.id)}
                >
                  <PlusCircleIcon className="text-gray-500" />
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
