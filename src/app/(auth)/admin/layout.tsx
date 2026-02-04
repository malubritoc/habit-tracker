"use client";

import { Header } from "@/components/header/header";
import { UserContext } from "@/contexts/UserProvider";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);

  if (user && user?.role != "ADMIN") {
    redirect("/home");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Header />
      <div className="max-w-6xl w-full flex flex-col gap-4 mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
