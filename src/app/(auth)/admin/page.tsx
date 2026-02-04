"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminUsersTable } from "@/components/admin/usersTable";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-2">
          <div onClick={() => router.push("/home")} className="cursor-pointer">
            <ArrowLeft size={24} color="#64748B" />
          </div>
          <h1 className="text-3xl font-bold">Painel do Administrador</h1>
        </div>
      </div>
      <AdminUsersTable />
    </div>
  );
}
