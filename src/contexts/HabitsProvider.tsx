"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useToast } from "@/components/hooks/use-toast";
import { Habit } from "@/types/habit";
import { useSession } from "next-auth/react";
import { API } from "@/services/api/@index";

interface HabitsContextProps {
  habits: Habit[] | null;
  setHabits: Dispatch<SetStateAction<Habit[] | null>>;
  loading: boolean;
}
export const HabitsContext = createContext({} as HabitsContextProps);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { data: session } = useSession();

  async function getData() {
    try {
      // Obtém todos os hábitos
      const habitsResponse = await API.getUserHabits(session?.accessToken);

      setHabits(habitsResponse);

      if (!habitsResponse || habitsResponse.length === 0) {
        setHabits([]);
      }

      setLoading(false);
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
    <HabitsContext.Provider value={{ habits, setHabits, loading }}>
      {children}
    </HabitsContext.Provider>
  );
}
