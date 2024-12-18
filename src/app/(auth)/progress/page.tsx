"use client";

import { ProgressAccordion } from "@/components/progress/accordion";
import { GeneralData } from "@/components/progress/generalData";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProgressPage() {
  const router = useRouter();
  const [general, setGeneral] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-2">
          <div onClick={() => router.push("/home")} className="cursor-pointer">
            <ArrowLeft size={24} color="#64748B" />
          </div>
          <h1 className="text-3xl font-bold">Meu Progresso</h1>
        </div>
        <h4 className="text-md text-default-gray">
          Acompanhe aqui o seu progresso.
        </h4>
      </div>
      <div className="flex items-center gap-2">
        <div
          data-general={general}
          onClick={() => setGeneral(false)}
          className="px-3 py-2 data-[general=false]:bg-light-orange rounded-2xl cursor-pointer text-sm"
        >
          Por hábitos
        </div>
        <div
          data-general={general}
          onClick={() => setGeneral(true)}
          className="px-3 py-2 data-[general=true]:bg-light-orange rounded-2xl cursor-pointer text-sm"
        >
          Geral
        </div>
      </div>
      {general ? <GeneralData /> : <ProgressAccordion />}
    </div>
  );
}
