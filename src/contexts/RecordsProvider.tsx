"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  // useContext,
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
// import { UserContext } from "./UserProvider";
import { parseCookies } from "nookies";

interface RecordsContextProps {
  records: Record[] | null;
  setRecords: Dispatch<SetStateAction<Record[] | null>>;
  setUpdateRecords: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}
export const RecordsContext = createContext({} as RecordsContextProps);

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<Record[] | null>(null);
  const [loading, setLoading] = useState(true);
  // const [empty, setEmpty] = useState(false);
  const [updateRecords, setUpdateRecords] = useState(false);
  const { toast } = useToast();
  const user_id = parseCookies()["habit-tracker-user"];

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

      const recordsResponse = await getTodayRecordsByUserId(user_id);

      recordsResponse?.sort((a: Record, b: Record) => {
        return Number(a.done) - Number(b.done);
      });

      setRecords(recordsResponse);

      if (!recordsResponse || recordsResponse.length === 0) {
        setRecords([]);
      }
      setLoading(false);
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
    <RecordsContext.Provider
      value={{ records, setRecords, setUpdateRecords, loading }}
    >
      {children}
    </RecordsContext.Provider>
  );
}
