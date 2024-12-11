import clsx from "clsx";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { ChartNoAxesCombined, LogOut, Plus, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "px-16 py-4",
        "bg-dark-blue"
      )}
    >
      <Image src={logo} alt="Logo" width={70} height={70} />
      <div className="flex items-center gap-3">
        <Plus size={28} color="#fef5c8" />
        <div className="h-8 border border-t-[1px] border-[#fef5c8]" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User size={28} color="#fef5c8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem className="flex gap-2 items-center">
              <User size={16} />
              <p>Meu Perfil</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 items-center">
              <ChartNoAxesCombined size={16} />
              <p>Meu Progresso</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 items-center">
              <LogOut size={16} />
              <p>Sair</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
