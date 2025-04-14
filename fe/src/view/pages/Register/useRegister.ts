import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { mutationKeys } from "@/app/config/mutationKeys";
import { SigninParams } from "@/app/services/authService/signin";
import { authService } from "@/app/services/authService";
import { useAuth } from "@/app/hooks/useAuth";
import { Role } from "@/app/entities/Role";
import { SignupParams } from "@/app/services/authService/signup";
import { AxiosError } from "axios";
import { useBases } from "@/app/hooks/bases/useBases";
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
  position: z.string().min(1, "Posição é obrigatório."),
  baseId: z.string().min(1, "Base é obrigatório."),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useRegister = () => {
  const { toast } = useToast();
  const { signin } = useAuth();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { bases, isFetchingBases } = useBases();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.SIGNUP],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(data);

    try {
      const { accessToken } = await mutateAsync({
        ...data,
        role: Role.PARTICIPANT,
      }); //Retorno da mutation Function
      signin(accessToken);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 499
        ) {
          toast({
            variant: "destructive",
            title: "Ocorreu um erro!",
            description: error.response.data.message,
            duration: 5000,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Ocorreu um erro!",
            description: "Por favor, tente novamente.",
          });
        }
      }
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
  };
};
