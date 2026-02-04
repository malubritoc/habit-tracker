"use client";

import { API } from "@/services/api/@index";
import { User } from "@/types/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2 } from "lucide-react";
import { SpinnerGraySmall } from "../spinnerGraySmall";

export function AdminUsersTable() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[] | null>(null);
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchUsers() {
    try {
      await API.getAllUsers(session?.accessToken).then((response) =>
        setUsers(response),
      );
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados de usuários.",
      });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(email: string) {
    setDeleteLoading(true);
    try {
      await API.deleteUserAdmin(session?.accessToken, email).then(() =>
        fetchUsers(),
      );
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erro ao deletar usuário",
      });
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <Table className="div border rounded-[8px]">
      <TableHeader>
        <TableRow className="bg-dark-blue text-white">
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Bio</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.bio}</TableCell>
              <TableCell
                data-admin={user.role === "ADMIN"}
                className="text-right data-[admin=true]:hidden"
              >
                <button
                  onClick={() => deleteUser(user.email)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <SpinnerGraySmall />
                  ) : (
                    <Trash2 size={24} className="text-red-500" />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground"
            >
              Não há usuários
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
