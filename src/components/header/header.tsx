"use client";

import clsx from "clsx";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { ChartNoAxesCombined, House, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { NewHabitButton } from "../newHabit/newHabitButton";
import { logOut } from "@/services/firebase";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    await logOut();
    router.push("/");
  }

  const menuOptions = [
    {
      title: "Meu Perfil",
      icon: <User size={16} />,
      onClick: () => router.push("/profile"),
    },
    {
      title: "Meu Progresso",
      icon: <ChartNoAxesCombined size={16} />,
      onClick: () => router.push("/progress"),
    },
    {
      title: "Sair",
      icon: <LogOut size={16} />,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "md:px-16 py-4 px-4",
        "bg-dark-blue"
      )}
    >
      <Image src={logo} alt="Logo" width={70} height={70} />
      <div className="flex items-center gap-3">
        <div className="cursor-pointer" onClick={() => router.push("/home")}>
          <House size={28} color="#fef5c8" />
        </div>
        <div className="h-8 border border-t-[1px] border-[#fef5c8]" />
        <NewHabitButton />
        <div className="h-8 border border-t-[1px] border-[#fef5c8]" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User size={28} color="#fef5c8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {menuOptions.map((option, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={option.onClick}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.title}</span>
                  </div>
                </DropdownMenuItem>
                {index == 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
