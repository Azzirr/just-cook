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
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { addRecipeToList } from "@/actions/allFavouriteListActions";
import { LoadingSpinner } from "../ui-custom/LoadingSpinner";
import { RecipeList } from "@prisma/client";

type RecipePageDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId?: string;
  userLists: RecipeList[];
};

export const RecipePageDialog = ({
  isOpen,
  setOpen,
  userId,
  userLists,
}: RecipePageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose your list</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add recipe to list, using plus icon
        </DialogDescription>
        {userLists.length === 0 ? (
          <p>No lists found.</p>
        ) : (
          <ScrollArea>
            {userLists.map((list) => (
              <div key={list.id}>
                <h4>{list.name}</h4>
                <Button
                  onClick={() => {
                    if (!userId) {
                      console.error("User ID is not available");
                      return;
                    }
                    //TODO - change "3" to real recipe id
                    addRecipeToList(userId, 1, list.id);
                  }}
                >
                  <PlusCircleIcon />
                </Button>
              </div>
            ))}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
