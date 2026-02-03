"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { RecordsProvider } from "@/contexts/RecordsProvider";
import { UserProvider } from "@/contexts/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SpinnerGraySmall } from "@/components/spinnerGraySmall";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <SpinnerGraySmall />
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        <UserProvider>
          <RecordsProvider>{children}</RecordsProvider>
        </UserProvider>
      </AuthGuard>
    </SessionProvider>
  );
}
