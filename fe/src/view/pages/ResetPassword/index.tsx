import { mutationKeys } from "@/app/config/mutationKeys";
import { authService } from "@/app/services/authService";
import { ResetPasswordParams } from "@/app/services/authService/resetPassword";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "Senha deve conter pelo menos 8 dígitos."),
    confirmPassword: z
      .string()
      .nonempty("Confirmação de senha é obrigatória")
      .min(8, "Senha deve conter pelo menos 8 dígitos."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"], // Onde o erro será exibido
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const token = new URLSearchParams(location.search).get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    isPending: isLoading,
    mutateAsync,
    isSuccess,
  } = useMutation({
    mutationKey: [mutationKeys.FORGOT_PASSWORD],
    mutationFn: async (data: ResetPasswordParams) => {
      return authService.resetPassword(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!token) {
      return toast({
        variant: "destructive",
        title: "Token inválido!",
        description: "Por favor, tente novamente.",
      });
    }
    try {
      const { message } = await mutateAsync({ token, ...data }); //Retorno da mutation Function
      toast({
        variant: "default",
        title: "Senha resetada com sucesso!",
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
          <CardTitle className="text-2xl font-bold">Redefinir senha</CardTitle>
          <CardDescription>Crie uma nova senha para sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess && (
            <div className="mb-4 space-y-4">
              <div className="p-6 bg-green-50 border-green-200 rounded-md">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div className="text-green-800">
                  Sua senha foi atualizada. Agora você pode fazer login com sua
                  nova senha.
                </div>
              </div>

              <div className="flex justify-center items-center ">
                <Button className="w-full">
                  <Link to="/login">Ir para o login</Link>
                </Button>
              </div>
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nova senha"
                  {...register("password")}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme a nova senha"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showConfirmPassword ? "Ocultar" : "Ver"}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Redefinir senha
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
