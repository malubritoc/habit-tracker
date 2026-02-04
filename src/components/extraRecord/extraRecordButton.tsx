"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import clsx from "clsx";
import { ExtraRecordDialogContent } from "./extraRecordDialogContent";

export function ExtraRecordButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          onClick={() => console.log("oi")}
          className={clsx(
            "flex flex-col justify-between",
            "w-[170px] h-[170px]",
            "p-4 rounded-2xl",
            "bg-light-turquoise",
            "font-bold text-xl text-dark-turquoise",
            "cursor-pointer",
          )}
        >
          <p className="text-start max-w-[90%]">Adicionar registro extra</p>
          <Plus size={24} className="self-end" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <ExtraRecordDialogContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
