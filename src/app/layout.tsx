import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "HabitTracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <main className="w-screen min-h-screen flex justify-center">
          <div className="w-full flex gap-0 items-start justify-center overflow-hidden shadow-custom">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
