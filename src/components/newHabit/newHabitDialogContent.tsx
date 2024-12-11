import { DialogTitle } from "../ui/dialog";
import { NewHabitForm } from "./newHabitForm";

export function NewHabitDialogContent() {
  return (
    <>
      <DialogTitle className="text-2xl">Adicionar Novo Hábito</DialogTitle>
      <NewHabitForm />
    </>
  );
}
