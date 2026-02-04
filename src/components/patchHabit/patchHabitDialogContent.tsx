"use client";

import { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import { PatchHabitForm } from "./patchHabitForm";
import { Record } from "@/types/records";

export function PatchHabitDialogContent({
  setOpen,
  record,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  record: Record;
}) {
  return (
    <>
      <DialogTitle className="text-2xl">Editar Hábito</DialogTitle>
      <PatchHabitForm setOpen={setOpen} record={record} />
    </>
  );
}
