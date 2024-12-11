import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NewHabitDialogContent } from "./newHabitDialogContent";

export function NewHabitButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">
                <Plus size={28} color="#fef5c8" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar novo hábito</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <NewHabitDialogContent />
      </DialogContent>
    </Dialog>
  );
}
