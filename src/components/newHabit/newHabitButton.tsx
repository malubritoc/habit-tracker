"use client";

import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NewHabitDialogContent } from "./newHabitDialogContent";
import { useState } from "react";

export function NewHabitButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <NewHabitDialogContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
