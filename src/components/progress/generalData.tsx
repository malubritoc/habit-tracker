import clsx from "clsx";
import Chart from "../chart/chart";

export function GeneralData() {
  const barStackedData = [
    { date: "15/05/2024", completed: 84, remaining: 16 },
    { date: "16/05/2024", completed: 75, remaining: 25 },
    { date: "17/05/2024", completed: 90, remaining: 10 },
    { date: "18/05/2024", completed: 50, remaining: 50 },
    { date: "19/05/2024", completed: 100, remaining: 0 },
    { date: "20/05/2024", completed: 60, remaining: 40 },
    { date: "21/05/2024", completed: 30, remaining: 70 },
  ];

  const lineData = [
    { date: "15/05/2024", completed: 84, remaining: 16 },
    { date: "16/05/2024", completed: 75, remaining: 25 },
    { date: "17/05/2024", completed: 90, remaining: 10 },
    { date: "18/05/2024", completed: 50, remaining: 50 },
    { date: "19/05/2024", completed: 100, remaining: 0 },
    { date: "20/05/2024", completed: 60, remaining: 40 },
    { date: "21/05/2024", completed: 30, remaining: 70 },
  ];

  const pieData = [
    { date: "15/05/2024", completed: 84, remaining: 16 },
    { date: "16/05/2024", completed: 75, remaining: 25 },
    { date: "17/05/2024", completed: 90, remaining: 10 },
    { date: "18/05/2024", completed: 50, remaining: 50 },
    { date: "19/05/2024", completed: 100, remaining: 0 },
    { date: "20/05/2024", completed: 60, remaining: 40 },
    { date: "21/05/2024", completed: 30, remaining: 70 },
  ];

  return (
    <div
      className={clsx(
        "flex flex-col gap-6",
        "px-8 py-6 rounded-2xl",
        "bg-baby-yellow"
      )}
    >
      <p className="font-medium">Todos os hábitos</p>
      <div className="flex flex-col text-sm">
        <p>
          Total de hábitos cadastrados: <strong>10000</strong>
        </p>
        <p>
          Total de hábitos cumpridos: <strong>5000</strong>
        </p>
      </div>
      <p className="text-sm text-default-gray font-medium">Resultados</p>

      <div>
        <h2 className="text-xs text-default-gray mb-4">
          Progresso Semanal de Tarefas
        </h2>
        <Chart data={barStackedData} chartType="bar-stacked" />
      </div>

      <div>
        <h2 className="text-xs text-default-gray mb-4">
          Progresso das Tarefas ao Longo da Semana
        </h2>
        <Chart data={lineData} chartType="line" />
      </div>

      <div>
        <h2 className="text-xs text-default-gray mb-4">Resumo das Tarefas</h2>
        <Chart data={pieData} chartType="pie" />
      </div>
    </div>
  );
}
