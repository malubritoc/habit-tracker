"use client";

import logo from "@/assets/logo_turquoise.png";
import woman from "@/assets/woman.png";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/container";
import { useRouter } from "next/navigation";
import { SignUpForm } from "@/components/signup/signUpForm";

export default function SignUpPage() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex items-center justify-center gap-8 bg-white">
      <div className="h-full w-full relative flex flex-col items-center gap-16 px-24 py-12">
        <Image src={logo} alt="Logo BuzzCreators" width={120} />
        <div className="w-full flex flex-col items-center ">
          <Container>
            <SignUpForm />
          </Container>
          <div className="w-full flex items-center justify-center gap-2 mt-4">
            <p className="">Já possui uma conta?</p>
            <button onClick={() => router.push("/")} className="text-blue-500">
              Entre agora
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "max-w-[704px] w-full min-h-fit h-full",
          "flex flex-col items-center justify-center gap-12",
          "!pt-16 pl-16 pb-8 pr-8",
          "bg-light-orange"
        )}
      >
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-start gap-2 pr-8 text-beige">
            <h1 className="text-5xl font-bold leading-tight">
              Cadastre-se agora no HabitTracker!
            </h1>
            <h5 className="text-lg leading-tight">
              A melhor forma de monitorar seus hábitos.
            </h5>
          </div>
        </div>
        <Image
          src={woman}
          alt="Initial Login"
          className="w-[95%] z-30 mb-[-32px] mr-[-32px]"
        />
      </div>
    </div>
  );
}
