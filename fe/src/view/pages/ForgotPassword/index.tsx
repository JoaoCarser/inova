import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { authService } from "@/app/services/authService";
import { ForgotPasswordParams } from "@/app/services/authService/forgotPassword";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { handleAxiosError } from "@/app/utils/handleAxiosError";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Digite um email válido" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { toast } = useToast();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    isPending: isLoading,
    mutateAsync,
    isSuccess,
    variables,
  } = useMutation({
    mutationKey: [mutationKeys.FORGOT_PASSWORD],
    mutationFn: async (data: ForgotPasswordParams) => {
      return authService.forgotPassword(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { message } = await mutateAsync(data); //Retorno da mutation Function
      toast({
        variant: "default",
        title: "Email enviado com sucesso!",
        description: message,
        duration: 5000,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
          <CardDescription>
            Digite seu email para receber um link de recuperação de senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess && (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div className="text-green-800">
                  Enviamos um email para <strong>{variables.email}</strong> com
                  instruções para redefinir sua senha.
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Verifique sua caixa de entrada e spam. O link expira em 30
                  minutos.
                </p>
                {/*   <p className="mt-2">
                  Não recebeu o email?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Tentar novamente
                  </Button>
                </p> */}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isSuccess
                ? "Reenviar link de recuperação"
                : "Enviar link de recuperação"}
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                Voltar para o login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
