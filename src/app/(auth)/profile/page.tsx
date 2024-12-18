"use client";

import { Container } from "@/components/container";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profile from "@/assets/profile.jpg";
import { ProfileForm } from "@/components/profile/profileForm";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-2">
          <div onClick={() => router.push("/home")} className="cursor-pointer">
            <ArrowLeft size={24} color="#64748B" />
          </div>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
        </div>
        <h4 className="text-md text-default-gray">
          Veja e edite aqui os seus dados pessoais.
        </h4>
      </div>
      <Container>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <div className="w-[120px] h-[120px] rounded-lg overflow-hidden">
              <Image
                src={profile}
                alt="Imagem de perfil"
                objectFit="cover"
                className="w-full"
              />
            </div>
          </div>
          <ProfileForm />
        </div>
      </Container>
    </div>
  );
}
