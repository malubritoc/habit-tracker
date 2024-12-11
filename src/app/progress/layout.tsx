import { Header } from "@/components/header/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Header />
      <div className="max-w-6xl w-full flex flex-col gap-4 mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
