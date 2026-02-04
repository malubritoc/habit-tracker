"use client";

import { useEffect, useState } from "react";
import { Record } from "@/types/records";
import { API } from "@/services/api/@index";
import { useSession } from "next-auth/react";
import { useToast } from "../hooks/use-toast";

export function HabitResults({ habitId }: { habitId: string }) {
  const { data: session } = useSession();
  const [habitRecords, setHabitRecords] = useState<Record[]>([]);
  const { toast } = useToast();

  async function fetchHabitRecords() {
    try {
      await API.getUserHabitRecords({
        token: session?.accessToken,
        habitId,
      }).then((response) => setHabitRecords(response));
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar resultados",
      });
    }
  }

  useEffect(() => {
    fetchHabitRecords();
  }, []);

  return (
    <div className="w-fit grid grid-cols-7 gap-1">
      {habitRecords.map((record, idx) => {
        return (
          <div
            key={idx}
            data-iscomplete={record.isCompleted}
            className="w-4 h-4 rounded-sm data-[iscomplete=true]:bg-dark-turquoise bg-light-orange"
          />
        );
      })}
    </div>
  );
}
