export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-8 border border-[1px] border-baby-gray rounded-lg overflow-hidden">
      {children}
    </div>
  );
}
