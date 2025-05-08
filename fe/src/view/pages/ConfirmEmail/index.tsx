"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/app/services/authService";
import { mutationKeys } from "@/app/config/mutationKeys";
import { toast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { useAuth } from "@/app/hooks/useAuth";
import { ConfirmEmailParams } from "@/app/services/authService/confirmEmail";

export default function ConfirmEmail() {
  const location = useLocation();
  const { signin } = useAuth();

  const token = new URLSearchParams(location.search).get("token");

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.SIGNIN],
    mutationFn: async (data: ConfirmEmailParams) => {
      return authService.confirmEmail(data);
    },
  });

  const handleSubmit = async () => {
    if (!token) {
      return toast({
        variant: "destructive",
        title: "Token inválido!",
        description: "Por favor, tente novamente.",
      });
    }

    try {
      const { accessToken } = await mutateAsync({
        token: token,
      });
      toast({
        variant: "default",
        title: "Email confirmado com sucesso!",
        description: "Você pode continuar com a sua sessão.",
        duration: 5000,
      });
      signin(accessToken);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <>
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Erro na verificação</h1>
                <p className="text-muted-foreground">
                  Não foi possível verificar seu email. O link pode ter expirado
                  ou ser inválido.
                </p>
              </div>
              <div className="space-y-4 w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Cofirmar E-mail
                </Button>
                <Button variant="outline" className="w-full">
                  Voltar para o cadastro
                </Button>
              </div>
            </>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
