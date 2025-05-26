import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { mutationKeys } from "@/app/config/mutationKeys";
import { authService } from "@/app/services/authService";
import { Role } from "@/app/entities/Role";
import { SignupParams } from "@/app/services/authService/signup";
import { useBases } from "@/app/hooks/bases/useBases";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  email: z
    .string()
    .min(1, "E-mail é obrigatório.")
    .email("Informe um E-mail válido."),
  password: z
    .string()
    .nonempty("Senha é obrigatório")
    .min(8, "Senha deve conter pelo menos 8 dígitos."),
  cpf: z.string().min(1, "CPF é obrigatório."),

  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useRegister = () => {
  const { toast } = useToast();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  console.log(errors);

  const { bases, isFetchingBases } = useBases();
  const navigate = useNavigate();
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isDialogTermsOpen, setIsDialogTermsOpen] = useState<boolean>(false);
  useState<boolean>(false);
  const [isTermsConfirmed, setIsTermsConfirmed] = useState<boolean>(false);

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.SIGNUP],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleChangeTerms = (value: boolean) => {
    setIsTermsConfirmed(value);
  };

  console.log("isTermsConfirmed", isTermsConfirmed);

  const handleChangeDialogTerms = (value: boolean) => {
    setIsDialogTermsOpen(value);
  };

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(data);

    if (!isTermsConfirmed) {
      toast({
        title: "Você precisa concordar com os termos e condições",
        description:
          "Antes de prosseguir, você deve concordar com os termos e condições",
        variant: "destructive",
      });
      return;
    }

    try {
      const { message } = await mutateAsync({
        ...data,
        role: Role.PARTICIPANT,
      }); //Retorno da mutation Function
      toast({
        variant: "default",
        title: "Cadastrado com sucesso!",
        description: message,
        duration: 5000,
      });

      setPendingEmail(data.email);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
    bases,
    isFetchingBases,
    pendingEmail,
    isDialogTermsOpen,
    handleChangeDialogTerms,
    handleChangeTerms,
    isTermsConfirmed,
    navigate,
  };
};
