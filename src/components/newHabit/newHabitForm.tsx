"use client";

import "@/styles/forms_styles.css";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SpinnerGraySmall } from "../spinnerGraySmall";
import { useToast } from "../hooks/use-toast";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { createDailyRecordIfNotExists, createHabit } from "@/services/firebase";
import { DayOfWeek } from "@/types/daysOfTheWeek";
import { RecordsContext } from "@/contexts/RecordsProvider";
import { Record } from "@/types/records";

const newHabitFormSchema = z.object({
  title: z.string().min(1, "Formato de conteúdo inválido.").max(24),
  description: z.string(),
  frequency: z.string(),
  days: z.array(z.string()).optional(),
});

type newHabitFormInputs = z.infer<typeof newHabitFormSchema>;

export function NewHabitForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const days = [
    { title: "Segunda-feira", value: "mon" as DayOfWeek },
    { title: "Terça-feira", value: "tue" as DayOfWeek },
    { title: "Quarta-feira", value: "wed" as DayOfWeek },
    { title: "Quinta-feira", value: "thu" as DayOfWeek },
    { title: "Sexta-feira", value: "fri" as DayOfWeek },
    { title: "Sábado", value: "sat" as DayOfWeek },
    { title: "Domingo", value: "sun" as DayOfWeek },
  ];
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const { setRecords } = useContext(RecordsContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    // setError,
    formState: { errors },
  } = useForm<newHabitFormInputs>({
    resolver: zodResolver(newHabitFormSchema),
    defaultValues: {
      frequency: "7",
    },
  });

  const frequency = watch("frequency");

  function handleDayChange(day: DayOfWeek) {
    setSelectedDays(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // Remove o dia se já estiver selecionado
          : [...prevDays, day] // Adiciona o dia se não estiver selecionado
    );
  }

  async function handleCreateNewHabit(data: newHabitFormInputs) {
    setLoading(true);
    try {
      console.log(data);
      await createHabit("habits", {
        name: data.title,
        frequency: parseInt(data.frequency),
        days:
          frequency == "7"
            ? ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
            : selectedDays,
        done: false,
      })
        .then((docRef) => createDailyRecordIfNotExists(docRef, "records"))
        .then((record) => {
          if (record) {
            setRecords((prev) => {
              if (!prev) return [];

              const updatedRecords = [...prev, record];
              updatedRecords.sort(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (a: any, b: any) => Number(a.done) - Number(b.done)
              );

              return updatedRecords;
            }); // Atualiza a lista de registros
          }
        });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "default",
        title: "Erro ao criar novo hábito",
        description:
          "Ocorreu um erro ao criar seu novo hábito, tente novamente.",
      });
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateNewHabit)}
    >
      <div className="div-field">
        <Label>Título</Label>
        <Input
          {...register("title")}
          placeholder="Digite aqui o título do seu hábito"
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Descrição</Label>
        <Textarea
          {...register("description")}
          rows={4}
          placeholder="Digite aqui mais detalhes sobre seu hábito (opcional)"
          className="resize-none"
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Frequência</Label>
        <Controller
          name="frequency"
          control={control}
          defaultValue="7"
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Diário</SelectItem>
                <SelectItem value="1">1x por semana</SelectItem>
                <SelectItem value="2">2x por semana</SelectItem>
                <SelectItem value="3">3x por semana</SelectItem>
                <SelectItem value="4">4x por semana</SelectItem>
                <SelectItem value="5">5x por semana</SelectItem>
                <SelectItem value="6">6x por semana</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.frequency && (
          <span className="error-message">{errors.frequency.message}</span>
        )}
      </div>
      {frequency != "7" && (
        <div className="div-field">
          <Label>
            Selecione {frequency == "1" ? "o dia" : "os dias"}{" "}
            <span className="text-default gray">(x/{frequency})</span>
          </Label>
          <div className="flex flex-col gap-1">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox
                    id={day.title}
                    checked={selectedDays.includes(day.value)}
                    onCheckedChange={() => handleDayChange(day.value)}
                  />
                  <label
                    htmlFor={day.title}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {day.title}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Separator className="mt-4 mb-2" />
      <div className="w-full flex flex-col gap-2">
        <Button disabled={loading} type="submit" className="w-full px-6">
          {loading ? <SpinnerGraySmall /> : "Adicionar hábito"}
        </Button>
        <Button
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
