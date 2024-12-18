"use client";

import { UserProvider } from "@/contexts/UserProvider";
import { redirect } from "next/navigation";
import { parseCookies } from "nookies";

export default function PrivatePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user_id = parseCookies()["habit-tracker-user"];

  console.log("user_id", user_id);

  if (!user_id) {
    redirect("/");
  }

  return <UserProvider>{children}</UserProvider>;
}
