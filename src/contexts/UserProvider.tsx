"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/users";
import { parseCookies } from "nookies";
import { getUserById } from "@/services/firebase";
import { toast } from "@/components/hooks/use-toast";
import { redirect } from "next/navigation";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const user_id = parseCookies()["habit-tracker-user"];

  async function getData() {
    try {
      // Obtém todos os hábitos
      const user = await getUserById(user_id);

      if (user) {
        setUser(user[0]);
      } else {
        redirect("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar dados do usuário",
        description: "Tente novamente mais tarde",
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
