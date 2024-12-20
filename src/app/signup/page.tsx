"use client";

import logo from "@/assets/logo_turquoise.png";
import woman from "@/assets/woman.png";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/container";
import { redirect, useRouter } from "next/navigation";
import { SignUpForm } from "@/components/signup/signUpForm";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user_id = parseCookies()["habit-tracker-user"];

  useEffect(() => {
    if (user_id) {
      redirect("/home");
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <></>
  ) : (
    <div className="w-full h-full flex items-center justify-center gap-8 bg-white">
      <div className="h-full w-full relative flex flex-col items-center md:gap-16 gap-8 md:px-24 px-8 py-12">
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
          "hidden md:flex md:flex-col md:items-center md:justify-center md:gap-12",
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
