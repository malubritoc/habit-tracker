"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/users";
import { toast } from "@/components/hooks/use-toast";
import { redirect } from "next/navigation";
import { API } from "@/services/api/@index";
import { useSession } from "next-auth/react";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  async function getData() {
    try {
      const user = await API.getUser(session?.accessToken);

      if (user) {
        setUser(user);
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
