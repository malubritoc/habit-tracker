import { Header } from "@/components/header/header";
import { HabitsProvider } from "@/contexts/HabitsProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HabitsProvider>
      <div className="w-full flex flex-col gap-4">
        <Header />
        <div className="max-w-6xl w-full flex flex-col gap-4 mx-auto p-4">
          {children}
        </div>
      </div>
    </HabitsProvider>
  );
}
