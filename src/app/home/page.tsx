"use client";

import { getAllHabits, updateHabitStatusFB } from "@/services/firebase";
import { DayOfWeek } from "@/types/daysOfTheWeek";
import { Habit } from "@/types/habit";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = daysOfWeek[new Date().getDay()];

  console.log(today);

  async function fetchHabits() {
    try {
      const response = await getAllHabits();
      const todayHabits = response.filter((habit: Habit) =>
        habit.days.includes(today as DayOfWeek)
      );
      todayHabits.sort((a: Habit, b: Habit) => Number(a.done) - Number(b.done));
      setHabits(todayHabits);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  async function updateHabitStatus(habitId: string, done: boolean) {
    try {
      await updateHabitStatusFB("habits", habitId, done);
      fetchHabits();
      // console.log(`Hábito ${habitId} atualizado com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar o hábito: ", error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-bold">Olá, Maria!</h1>
        <h4 className="text-md text-default-gray">
          Hoje é dia <strong>09 de dezembro de 2024</strong>. O que você fez
          hoje?
        </h4>
      </div>
      <div className="grid md:grid-cols-6 md:gap-8 grid-cols-2 gap-4 self-center">
        {habits.map((habit, idx) => {
          return (
            <div
              onClick={() => updateHabitStatus(habit.id, !habit.done)}
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
              <p className="max-w-[90%]">{habit.name}</p>
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
