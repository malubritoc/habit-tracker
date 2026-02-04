"use client";

import { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import { ExtraRecordForm } from "./extraRecordForm";

export function ExtraRecordDialogContent({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <DialogTitle className="text-2xl">Adicionar Registro Extra</DialogTitle>
      <ExtraRecordForm setOpen={setOpen} />
    </>
  );
}
