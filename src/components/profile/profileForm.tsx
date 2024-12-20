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
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserProvider";
import { updateDBUser } from "@/services/firebase";

const profileSchema = z.object({
  name: z.string().min(2, "Nome inválido."),
  email: z.string().email(),
});

type profileInputs = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    // setError,
    formState: { errors },
  } = useForm<profileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  async function handleEditProfile(data: profileInputs) {
    setLoading(true);
    try {
      // console.log(data);

      if (user) {
        // console.log(user?.id);
        await updateDBUser({
          new_name: data.name,
          user_id: user?.id,
        }).then(() => {
          setUser({ ...user, name: data.name });
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
        setValue("name", user?.name);
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

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleEditProfile)}
    >
      <div className="div-field">
        <Label>E-mail</Label>
        <Input
          {...register("email")}
          placeholder="Digite aqui o título do seu hábito"
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
          placeholder="Digite aqui o título do seu hábito"
          disabled={!edit}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
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
        <Button className="w-fit self-end px-12" onClick={() => setEdit(true)}>
          Editar Perfil
        </Button>
      )}
    </form>
  );
}
