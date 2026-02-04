"use client";

import "@/styles/forms_styles.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SpinnerGraySmall } from "../spinnerGraySmall";
import { useToast } from "../hooks/use-toast";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserProvider";
import { API } from "@/services/api/@index";
import { signOut, useSession } from "next-auth/react";

const profileSchema = z.object({
  name: z.string().min(2, "Nome inválido."),
  email: z.string().email(),
  bio: z.string().optional(),
});

type profileInputs = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<profileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      bio: user?.bio,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName,
        email: user.email,
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  async function handleEditProfile(data: profileInputs) {
    setLoading(true);
    try {
      if (user) {
        await API.updateProfile({
          token: session?.accessToken,
          name: data.name,
          bio: data.bio,
        }).then((response) => {
          setUser(response);
          toast({
            variant: "success",
            title: "Perfil editado com sucesso",
            description: "Seu perfil foi editado com sucesso.",
          });
        });
      }

      setLoading(false);
    } catch (error) {
      if (user) {
        setValue("name", user?.displayName);
      }
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erro ao editar perfil",
        description: "Ocorreu um erro ao editar seu perfil, tente novamente.",
      });
      setLoading(false);
    }
    setEdit(false);
  }

  async function handleDeleteAccount() {
    try {
      await API.deleteUser(session?.accessToken).then(() =>
        signOut({ callbackUrl: "/" }),
      );
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao deletar conta",
      });
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleEditProfile)}
    >
      <div className="div-field">
        <Label>E-mail</Label>
        <Input
          {...register("email")}
          placeholder="Digite aqui o seu e-mail"
          disabled
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Nome</Label>
        <Input
          {...register("name")}
          placeholder="Digite aqui seu nome"
          disabled={!edit}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Bio</Label>
        <Input
          {...register("bio")}
          placeholder="Digite aqui a sua bio"
          disabled={!edit}
        />
        {errors.bio && (
          <span className="error-message">{errors.bio.message}</span>
        )}
      </div>
      {edit && (
        <Button
          disabled={loading}
          type="submit"
          className="w-fit self-end px-12 bg-dark-orange hover:bg-dark-orange/90"
        >
          {loading ? <SpinnerGraySmall /> : "Salvar alterações"}
        </Button>
      )}{" "}
      {!edit && (
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-between gap-2">
            <Button
              data-admin={user && user.role === "ADMIN"}
              type="button"
              onClick={() => handleDeleteAccount()}
              variant="destructive"
              className="w-[200px] data-[admin=true]:hidden"
            >
              Excluir conta
            </Button>
            <Button
              className="min-w-[200px] w-fit self-end px-12"
              onClick={() => setEdit(true)}
            >
              Editar Perfil
            </Button>
          </div>
          <span
            data-admin={user && user.role === "ADMIN"}
            className="text-xs text-red-500 data-[admin=true]:hidden"
          >
            *Esta ação não poderá ser desfeita
          </span>
        </div>
      )}
    </form>
  );
}
