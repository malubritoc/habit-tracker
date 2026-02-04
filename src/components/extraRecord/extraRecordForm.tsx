"use client";

import "@/styles/forms_styles.css";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { SpinnerGraySmall } from "../spinnerGraySmall";
import { useToast } from "../hooks/use-toast";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Separator } from "../ui/separator";
import { RecordsContext } from "@/contexts/RecordsProvider";
import { API } from "@/services/api/@index";
import { useSession } from "next-auth/react";
import { HabitsContext } from "@/contexts/HabitsProvider";

const extraRecordFormSchema = z.object({
  habitId: z.string(),
});

type extraRecordFormInputs = z.infer<typeof extraRecordFormSchema>;

export function ExtraRecordForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const { habits } = useContext(HabitsContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setUpdateRecords } = useContext(RecordsContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<extraRecordFormInputs>({
    resolver: zodResolver(extraRecordFormSchema),
  });

  async function handleCreateExtraRecord(data: extraRecordFormInputs) {
    setLoading(true);
    try {
      await API.createExtraUserHabitRecord({
        token: session?.accessToken,
        habitId: data.habitId,
      }).then((record) => {
        if (record) {
          setUpdateRecords(true);
        }
      });
      setLoading(false);
      setOpen(false);
      toast({
        variant: "success",
        title: "Registro criado com sucesso",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erro ao criar novo registro",
        description:
          "Ocorreu um erro ao criar seu novo registro, tente novamente.",
      });
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateExtraRecord)}
    >
      <div className="div-field">
        <Label>Hábito</Label>
        <Controller
          name="habitId"
          control={control}
          defaultValue="7"
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                {habits?.map((habit, idx) => {
                  return (
                    <SelectItem key={idx} value={habit.id}>
                      {habit.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.habitId && (
          <span className="error-message">{errors.habitId.message}</span>
        )}
      </div>
      <Separator className="mt-4 mb-2" />
      <div className="w-full flex flex-col gap-2">
        <Button disabled={loading} type="submit" className="w-full px-6">
          {loading ? <SpinnerGraySmall /> : "Adicionar registro"}
        </Button>
        <Button
          type="button"
          onClick={() => setOpen(false)}
          variant="cancel"
          className="w-full px-6"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
