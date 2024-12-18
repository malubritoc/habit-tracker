"use client";

import { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import { NewHabitForm } from "./newHabitForm";

export function NewHabitDialogContent({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <DialogTitle className="text-2xl">Adicionar Novo Hábito</DialogTitle>
      <NewHabitForm setOpen={setOpen} />
    </>
  );
}
