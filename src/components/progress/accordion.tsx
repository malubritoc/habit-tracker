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
import Chart from "../chart/chart";
import { generateFakeProgressData } from "@/utils/generateFakeData";

export function ProgressAccordion() {
  const { habits, loading } = useContext(HabitsContext);

  // const lineData = [
  //   { date: "15/05/2024", completed: 84, remaining: 16 },
  //   { date: "16/05/2024", completed: 75, remaining: 25 },
  //   { date: "17/05/2024", completed: 90, remaining: 10 },
  //   { date: "18/05/2024", completed: 50, remaining: 50 },
  //   { date: "19/05/2024", completed: 100, remaining: 0 },
  //   { date: "20/05/2024", completed: 60, remaining: 40 },
  //   { date: "21/05/2024", completed: 30, remaining: 70 },
  // ];

  // const pieData = [
  //   { date: "15/05/2024", completed: 84, remaining: 16 },
  //   { date: "16/05/2024", completed: 75, remaining: 25 },
  //   { date: "17/05/2024", completed: 90, remaining: 10 },
  //   { date: "18/05/2024", completed: 50, remaining: 50 },
  //   { date: "19/05/2024", completed: 100, remaining: 0 },
  //   { date: "20/05/2024", completed: 60, remaining: 40 },
  //   { date: "21/05/2024", completed: 30, remaining: 70 },
  // ];

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
                  <div className="block lg:flex lg:gap-4 lg:flex-wrap mt-4">
                    <div className="lg:w-[45%] w-full">
                      <h2 className="text-xs text-default-gray mb-4">
                        Progesso semanal
                      </h2>
                      <Chart
                        data={generateFakeProgressData("weekly")}
                        chartType="pie"
                        mini={true}
                        title="Progresso das tarefas ao longo da semana"
                      />
                    </div>
                    <div className="lg:w-[45%] w-full">
                      <h2 className="text-xs text-default-gray mb-4">
                        Progesso mensal
                      </h2>
                      <Chart
                        data={generateFakeProgressData("monthly")}
                        chartType="pie"
                        mini={true}
                        title="Progresso das tarefas ao longo do mês"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-xs text-default-gray mb-4">
                      Progresso geral
                    </h2>
                    <Chart
                      data={generateFakeProgressData("general")}
                      chartType="line"
                      title="Progresso total da atividade"
                    />
                  </div>
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
