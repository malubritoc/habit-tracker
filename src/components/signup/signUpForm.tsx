"use client";

import "@/styles/forms_styles.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { SpinnerGraySmall } from "../spinnerGraySmall";
import { toast } from "../hooks/use-toast";
import { signUp } from "@/services/firebase";
import { useRouter } from "next/navigation";

const signUpFormSchema = z.object({
  name: z.string().min(1, "Nome inválido."),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(4, "Senha inválida."),
  confirmPassword: z.string().min(4, "Senha inválida."),
});

type SignUpFormInputs = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpFormSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleSignUp = async (data: SignUpFormInputs) => {
    setLoading(true);
    try {
      // console.log(data);

      if (password !== confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "As senhas não coincidem.",
        });
        setLoading(false);
        return;
      }

      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      }).then(() => {
        toast({
          variant: "success",
          title: "Usuário registrado com sucesso",
          description:
            "Seja bem vindo ao HabitTracker! Efetue o seu login com as credenciais cadastradas para começar.",
        });
        setLoading(false);
        router.push("/");
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
      onSubmit={handleSubmit(handleSignUp)}
      className="w-full flex flex-col gap-[19px]"
    >
      <h3 className="text-xl text-[#1a1a1a] font-bold">
        Bem-vindo(a) de volta!
      </h3>
      <div className="div-fields">
        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Digite aqui seu nome"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>
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
      <div className="div-fields">
        <Label>Confirme sua senha</Label>
        <div className="w-full flex justify-between items-center border border-gray-[#AEB0B3] rounded-[8px] p-2 pr-4">
          <input
            type={confirmShowPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            className="w-full outline-none"
            {...register("confirmPassword")}
          />
          {confirmShowPassword ? (
            <Eye
              color="black"
              size={16}
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className="cursor-pointer"
            />
          ) : (
            <EyeOff
              color="#64748B"
              size={16}
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className="cursor-pointer"
            />
          )}
        </div>
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button disabled={loading} type="submit" className="w-full">
        {loading ? <SpinnerGraySmall /> : "Entrar"}
      </Button>
    </form>
  );
}
