import clsx from "clsx";
import { Check } from "lucide-react";

export default function HomePage() {
  const habits = [
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: false },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
    { title: "Beber 2 litros d'água por dia", done: true },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-bold">Olá, Maria!</h1>
        <h4 className="text-md text-default-gray">
          Hoje é dia <strong>09 de dezembro de 2024</strong>. O que você fez
          hoje?
        </h4>
      </div>
      <div className="grid grid-cols-6 gap-8">
        {habits.map((habit, idx) => {
          return (
            <div
              data-done={habit.done}
              className={clsx(
                "flex flex-col justify-between",
                "w-[170px] h-[170px]",
                "p-4 rounded-2xl",
                "data-[done=true]:bg-light-turquoise bg-light-orange",
                "font-bold text-xl data-[done=true]:text-dark-turquoise text-baby-yellow",
                "cursor-pointer"
              )}
              key={idx}
            >
              <p className="max-w-[90%]">{habit.title}</p>
              {habit.done ? (
                <div className="w-full flex justify-end">
                  <Check size={24} color="#2c6b74" />
                </div>
              ) : (
                <div className="w-full flex justify-end">
                  <div className="w-3 h-3 bg-baby-yellow rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
