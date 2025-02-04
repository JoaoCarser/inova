import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { mutationKeys } from "@/app/config/mutationKeys";
import { SigninParams } from "@/app/services/authService/signin";
import { authService } from "@/app/services/authService";
import { useAuth } from "@/app/hooks/useAuth";
const schema = z.object({
  email: z.string().min(1, "E-mail é obrigatório.").email("Informe um E-mail válido."),
  password: z
    .string()
    .nonempty("Senha é obrigatório")
    .min(8, "Senha deve conter pelo menos 8 dígitos."),
});

type FormData = {
  email: string;
  password: string;
};

//type FormData = z.infer<typeof schema>;

export const useLogin = () => {
  const { toast } = useToast();
  const { signin } = useAuth();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.SIGNIN],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data); //Retorno da mutation Function
      signin(accessToken);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Credênciais inválidas.",
        description: "Por favor, tente novamente.",
      });
    }
  });

  return { handleSubmit, register, errors, isLoading };
};
