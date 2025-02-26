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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  addRecipeToList,
  getRecipeLists,
} from "@/actions/allFavouriteListActions";
import { LoadingSpinner } from "../ui-custom/LoadingSpinner";

type RecipePageDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
};
type RecipeList = {
  id: number;
  name: string;
};

export const RecipePageDialog = ({
  open,
  setOpen,
  userId,
}: RecipePageDialogProps) => {
  const [myMenuLists, setMyMenuLists] = useState<RecipeList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipeLists = async () => {
      try {
        const lists = await getRecipeLists(userId, true);
        setMyMenuLists(lists ?? []);
      } catch (error) {
        console.error("Error fetching recipe lists:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchRecipeLists();
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose your list</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center sm:text-left">
          Add recipe to list, using plus icon
        </DialogDescription>
        {loading ? (
          <LoadingSpinner
            className="flex w-full flex-col items-center justify-center"
            width={40}
            height={40}
          />
        ) : (
          <ScrollArea className="max-h-[70vh] py-5">
            {myMenuLists.length === 0 ? (
              <p>No lists found.</p>
            ) : (
              myMenuLists.map((list: RecipeList, index: number) => (
                <div
                  key={index}
                  className="mr-5 flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <h4 className="text-[16px]">{list.name}</h4>
                  <Button
                    variant="ghost"
                    className="my-2 rounded-full border border-gray-300 p-2 hover:bg-gray-100"
                    //TODO - change "3" to real recipe id
                    onClick={() => addRecipeToList(userId, 3, list.id)}
                  >
                    <PlusCircleIcon className="text-gray-500" />
                  </Button>
                </div>
              ))
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
