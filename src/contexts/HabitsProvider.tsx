"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useToast } from "@/components/hooks/use-toast";
import { getAllHabits } from "@/services/firebase";
import { Habit } from "@/types/habit";

interface HabitsContextProps {
  habits: Habit[] | null;
  setHabits: Dispatch<SetStateAction<Habit[] | null>>;
}
export const HabitsContext = createContext({} as HabitsContextProps);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const { toast } = useToast();

  async function getData() {
    try {
      // Obtém todos os hábitos
      const habitsResponse = await getAllHabits();

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
