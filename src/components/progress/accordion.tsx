import { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HabitsContext } from "@/contexts/HabitsProvider";
import { translateDay } from "@/utils/translateDay";

export function ProgressAccordion() {
  const { habits } = useContext(HabitsContext);

  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
      {habits?.map((habit, idx) => {
        return (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{habit.name}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p className="text-default-gray text-sm">{habit.description}</p>
              <p>
                Frequência:{" "}
                <strong>
                  {habit.frequency} {habit.frequency == 1 ? "dia" : "dias"} por
                  semana{" "}
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
      })}
    </Accordion>
  );
}
