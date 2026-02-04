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
import { useSession } from "next-auth/react";
import { getTodayUserHabitRecords } from "@/services/api/getTodayUserHabitRecords";

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

  const [updateRecords, setUpdateRecords] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  async function getData() {
    try {
      const recordsResponse = await getTodayUserHabitRecords(
        session?.accessToken,
      );

      recordsResponse?.sort((a: Record, b: Record) => {
        return Number(a.isCompleted) - Number(b.isCompleted);
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
