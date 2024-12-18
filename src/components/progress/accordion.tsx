import { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HabitsContext } from "@/contexts/HabitsProvider";
import { translateDay } from "@/utils/translateDay";
import { Skeleton } from "../ui/skeleton";

export function ProgressAccordion() {
  const { habits, loading } = useContext(HabitsContext);

  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
      {!loading
        ? habits?.map((habit, idx) => {
            return (
              <AccordionItem value={`item-${idx}`} key={idx}>
                <AccordionTrigger>{habit.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <p className="text-default-gray text-sm">
                    {habit.description}
                  </p>
                  <p>
                    Frequência:{" "}
                    <strong>
                      {habit.frequency} {habit.frequency == 1 ? "dia" : "dias"}{" "}
                      por semana{" "}
                      {habit.frequency == 7
                        ? "(Diário)"
                        : `(${habit.days
                            .map((day) => translateDay(day))
                            .join(" - ")})`}
                    </strong>
                  </p>
                  <p className="text-default-gray text-sm font-medium">
                    Resultados
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })
        : [...Array(3)].map((_, idx) => {
            return <Skeleton key={idx} className="w-full h-16 rounded-2xl" />;
          })}
      {habits?.length === 0 && (
        <div className="flex flex-col items center self-center text-center">
          <p className="text-lg text-dark-blue">Você não possui hábitos!</p>
          <p className="text-sm items-center text-default-gray/70">
            Adicione novos hábitos clicando no ícone{" "}
            <span className="text-dark-blue font-bold">+</span> do menu
            superior.
          </p>
        </div>
      )}
    </Accordion>
  );
}
