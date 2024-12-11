import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function ProgressAccordion() {
  const habits = [
    { title: "Beber 2 litros d'àgua", frequency: "Diária" },
    { title: "Beber 2 litros d'àgua", frequency: "Diária" },
    { title: "Beber 2 litros d'àgua", frequency: "Diária" },
    { title: "Beber 2 litros d'àgua", frequency: "Diária" },
    { title: "Beber 2 litros d'àgua", frequency: "Diária" },
  ];

  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
      {habits.map((habit, idx) => {
        return (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{habit.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                Frequência: <strong>{habit.frequency}</strong>
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
