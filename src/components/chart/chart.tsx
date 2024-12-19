/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  PieController,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  PieController,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface TaskData {
  date: string;
  completed: number;
  remaining: number;
}

interface ProgressChartProps {
  data: TaskData[];
  chartType: "bar-stacked" | "line" | "pie";
  title?: string;
  mini?: boolean;
}

// podemos criar um dicionário para definir os tipos de gráficos por qual gráfico ao invés do tipo dele
// exemplo: Daily-Water = bar-stacked, Daily-Exercise = line, Daily-Steps = pie
// const ChartDict = {};

const ProgressChart = ({
  data,
  chartType,
  title,
  mini = false,
}: ProgressChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  const getChartData = (type: "bar-stacked" | "line" | "pie") => {
    const labels = data.map((item) => item.date);
    let datasets: any[] = [];
    let options: any = {};

    switch (type) {
      case "bar-stacked":
        datasets = [
          {
            label: "Tarefas finalizadas",
            data: data.map((item) => item.completed),
            backgroundColor: "rgba(122, 204, 96, 0.8)",
            borderColor: "rgba(122, 204, 96, 1)",
            borderWidth: 1,
            maxBarThickness: 40,
          },
          {
            label: "Tarefas pendentes",
            data: data.map((item) => item.remaining),
            backgroundColor: "rgba(230, 98, 100, 0.8)",
            borderColor: "rgba(230, 98, 100, 1)",
            borderWidth: 1,
            maxBarThickness: 40,
          },
        ];
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: title ? true : false,
              text: title,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: any) =>
                  `${context.dataset.label}: ${context.raw}%`,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
              },
              grid: {
                display: false,
              },
            },
          },
        };
        break;
      case "line":
        datasets = [
          {
            label: "Progresso",
            data: data.map((item) => item.completed),
            borderColor: "rgba(1, 55, 80, 1)",
            backgroundColor: "rgba(1, 55, 80, 0.3)",
            fill: true,
            tension: 0.4,
          },
        ];
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: title ? true : false,
              text: title,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: any) =>
                  `${context.dataset.label}: ${context.raw}%`,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
              },
              grid: {
                display: false,
              },
            },
          },
        };
        break;
      case "pie":
        datasets = [
          {
            label: "Progresso",
            data: [
              (
                data.reduce((acc, item) => acc + item.completed, 0) /
                data.length
              ).toFixed(2),
              (
                data.reduce((acc, item) => acc + item.remaining, 0) /
                data.length
              ).toFixed(2),
            ],
            backgroundColor: [
              "rgba(122, 204, 96, 0.8)",
              "rgba(230, 98, 100, 0.8)",
            ],
            borderColor: ["rgba(122, 204, 96, 0.8)", "rgba(230, 98, 100, 0.8)"],
            borderWidth: 1,
          },
        ];
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: title ? true : false,
              text: title,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: any) =>
                  `${context.dataset.label}: ${context.raw}%`,
              },
            },
          },
        };
        break;
      default:
        break;
    }

    return { labels, datasets, options };
  };

  useEffect(() => {
    const { labels, datasets, options } = getChartData(chartType);

    const getChartType = (type: string) => {
      switch (type) {
        case "bar-stacked":
          return "bar";
        case "line":
          return "line";
        case "pie":
          return "pie";
        default:
          return "bar";
      }
    };

    if (chartRef.current) {
      chartInstance.current = new ChartJS(chartRef.current, {
        type: getChartType(chartType),
        data: { labels, datasets },
        options: options,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartType, title]);

  return (
    <div
      className={`w-full ${
        mini ? "w-1/3" : "w-full"
      } min-h-[80px] h-[400px] mx-auto`}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ProgressChart;
