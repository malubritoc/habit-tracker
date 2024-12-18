"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useToast } from "@/components/hooks/use-toast";
import { getHabitsByUserId } from "@/services/firebase";
import { Habit } from "@/types/habit";
import { parseCookies } from "nookies";

interface HabitsContextProps {
  habits: Habit[] | null;
  setHabits: Dispatch<SetStateAction<Habit[] | null>>;
}
export const HabitsContext = createContext({} as HabitsContextProps);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const { toast } = useToast();
  const user_id = parseCookies()["habit-tracker-user"];

  async function getData() {
    try {
      // Obtém todos os hábitos
      const habitsResponse = await getHabitsByUserId(user_id);

      setHabits(habitsResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar hábitos",
        description: "Tente novamente mais tarde",
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}
