"use client";

import { RecordsProvider } from "@/contexts/RecordsProvider";
import { UserProvider } from "@/contexts/UserProvider";
import { redirect } from "next/navigation";
import { parseCookies } from "nookies";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user_id = parseCookies()["habit-tracker-user"];

  if (!user_id) {
    redirect("/");
  }

  return (
    <UserProvider>
      <RecordsProvider>{children}</RecordsProvider>
    </UserProvider>
  );
}
