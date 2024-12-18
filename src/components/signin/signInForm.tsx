"use client";

import "@/styles/forms_styles.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { SpinnerGraySmall } from "../spinnerGraySmall";
import { toast } from "../hooks/use-toast";
import { signIn } from "@/services/firebase";
import { useRouter } from "next/navigation";

const signInFormSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(4, "Senha inválida."),
  remember: z.boolean().optional(),
});

type SignInFormInputs = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignIn = async (data: SignInFormInputs) => {
    setLoading(true);
    try {
      // console.log(data);

      await signIn({
        email: data.email,
        password: data.password,
      }).then(() => {
        setLoading(false);
        router.push("/home");
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique seus dados e tente novamente.",
      });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="w-full flex flex-col gap-[19px]"
    >
      <h3 className="text-xl text-[#1a1a1a] font-bold">
        Bem-vindo(a) de volta!
      </h3>
      <div className="div-fields">
        <Label>E-mail</Label>
        <Input type="text" placeholder="Email" {...register("email")} />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="div-fields">
        <Label>Senha</Label>
        <div className="w-full flex justify-between items-center border border-gray-[#AEB0B3] rounded-[8px] p-2 pr-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            className="w-full outline-none"
            {...register("password")}
          />
          {showPassword ? (
            <Eye
              color="black"
              size={16}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
          ) : (
            <EyeOff
              color="#64748B"
              size={16}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
          )}
        </div>
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Switch id="remember-me" />
          <Label htmlFor="remember-me">Lembrar-me</Label>
        </div>
        <a href="" className="text-xs text-blue-500">
          Esqueceu sua senha?
        </a>
      </div>
      <Button
        disabled={loading}
        type="submit"
        className="w-full bg-dark-orange"
      >
        {loading ? <SpinnerGraySmall /> : "Entrar"}
      </Button>
    </form>
  );
}
