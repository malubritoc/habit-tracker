"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Record } from "../types/records";
import { useToast } from "@/components/hooks/use-toast";
import {
  createDailyRecordIfNotExists,
  getAllHabits,
  // getTodayRecords,
  getTodayRecordsByUserId,
} from "@/services/firebase";
import { UserContext } from "./UserProvider";

interface RecordsContextProps {
  records: Record[] | null;
  setRecords: Dispatch<SetStateAction<Record[] | null>>;
  setUpdateRecords: Dispatch<SetStateAction<boolean>>;
}
export const RecordsContext = createContext({} as RecordsContextProps);

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<Record[] | null>(null);
  const [updateRecords, setUpdateRecords] = useState(false);
  const { toast } = useToast();
  const { user } = useContext(UserContext);

  async function getData() {
    try {
      // Obtém todos os hábitos
      const habitsResponse = await getAllHabits();

      // Se há hábitos, cria registros diários para os que estão ativos no dia atual
      if (habitsResponse.length > 0) {
        // console.log("Há hábitos cadastrados");
        for (const habit of habitsResponse) {
          await createDailyRecordIfNotExists(habit, "records");
        }
      }
      if (user) {
        const recordsResponse = await getTodayRecordsByUserId(user?.id);

        recordsResponse?.sort((a: Record, b: Record) => {
          return Number(a.done) - Number(b.done);
        });
        // console.log(recordsResponse);
        setRecords(recordsResponse);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar registros do dia",
        description: "Tente novamente mais tarde",
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (updateRecords) {
      getData();
      setUpdateRecords(false);
    }
  }, [updateRecords]);

  return (
    <RecordsContext.Provider value={{ records, setRecords, setUpdateRecords }}>
      {children}
    </RecordsContext.Provider>
  );
}
