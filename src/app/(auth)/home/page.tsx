"use client";

import { RecordsContext } from "@/contexts/RecordsProvider";
import { UserContext } from "@/contexts/UserProvider";
import { updateHabitRecordStatusFB } from "@/services/firebase";
import { Record } from "@/types/records";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useContext } from "react";

export default function HomePage() {
  const { records, setRecords } = useContext(RecordsContext);
  const { user } = useContext(UserContext);
  const today = formatDate(new Date().toISOString().split("T")[0]);

  async function updateHabitRecordStatus(habitRecordId: string, done: boolean) {
    try {
      await updateHabitRecordStatusFB("records", habitRecordId, done);
      // console.log(`Hábito ${habitId} atualizado com sucesso!`);
      setRecords((prev) => {
        if (!prev) return [];

        // Atualiza o registro no array
        const updatedRecords = prev.map((record) => {
          if (record.id === habitRecordId) {
            return { ...record, done };
          }
          return record;
        });

        // Ordena os registros para que 'done = false' apareçam primeiro
        updatedRecords.sort(
          (a: Record, b: Record) => Number(a.done) - Number(b.done)
        );

        return updatedRecords;
      });
    } catch (error) {
      console.error("Erro ao atualizar o hábito: ", error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-bold">Olá, {user?.name}!</h1>
        <h4 className="text-md text-default-gray">
          Hoje é dia <strong>{today}</strong>. O que você fez hoje?
        </h4>
      </div>
      <div className="grid md:grid-cols-6 md:gap-8 grid-cols-2 gap-4 self-center">
        {records?.map((record, idx) => {
          return (
            <div
              onClick={() => updateHabitRecordStatus(record.id, !record.done)}
              data-done={record.done}
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
              <p className="max-w-[90%]">{record.habit.name}</p>
              {record.done ? (
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
