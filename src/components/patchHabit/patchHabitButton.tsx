"use client";

import { PenLine } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import clsx from "clsx";
import { PatchHabitDialogContent } from "./patchHabitDialogContent";
import { Record } from "@/types/records";

export function PatchHabitButton({ record }: { record: Record }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="w-full flex justify-end">
          <PenLine
            size={24}
            className={clsx(
              record.isCompleted ? `text-dark-turquoise` : `text-baby-yellow`,
            )}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <PatchHabitDialogContent setOpen={setOpen} record={record} />
      </DialogContent>
    </Dialog>
  );
}
