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
import { UserContext } from "@/contexts/UserProvider";

const newHabitFormSchema = z.object({
  title: z.string().min(1, "Título inválido.").max(24),
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
  const { setUpdateRecords } = useContext(RecordsContext);
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<newHabitFormInputs>({
    resolver: zodResolver(newHabitFormSchema),
    defaultValues: {
      frequency: "7",
    },
    mode: "onBlur",
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
      // console.log(data);

      if (!user) return;

      if (selectedDays.length > Number(frequency)) {
        setError("days", {
          message: "Número de dias selecionados superior à frequência.",
        });
        setLoading(false);
        return;
      }

      await createHabit("habits", {
        name: data.title,
        frequency: parseInt(data.frequency),
        days:
          frequency == "7"
            ? ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
            : selectedDays,
        done: false,
        description: data.description,
        user_id: user.id,
      })
        .then((docRef) => createDailyRecordIfNotExists(docRef, "records"))
        .then((record) => {
          if (record) {
            setUpdateRecords(true);
          }
        });
      setLoading(false);
      setOpen(false);
      toast({
        variant: "success",
        title: "Hábito criado com sucesso",
        description:
          "Seu novo hábito foi criado com sucesso. Ele será adicionado à sua lista de hábitos diários conforme a frequência e dias selecionados.",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
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
                <SelectValue placeholder="Selecione a frequência" />
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
            <span
              data-forbidden={selectedDays.length > Number(frequency)}
              data-max={selectedDays.length == Number(frequency)}
              className="text-default-gray/50 data-[forbidden=true]:text-red-500 data-[max=true]:text-green-500"
            >
              ({selectedDays.length}/{frequency})
            </span>
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
          {errors.days && (
            <span className="error-message">{errors.days.message}</span>
          )}
        </div>
      )}
      <Separator className="mt-4 mb-2" />
      <div className="w-full flex flex-col gap-2">
        <Button disabled={loading} type="submit" className="w-full px-6">
          {loading ? <SpinnerGraySmall /> : "Adicionar hábito"}
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
