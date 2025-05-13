
import { Mail } from "lucide-react";

interface EmailVerificationPendingProps {
  email: string;
}

export function EmailVerificationPending({
  email,
}: EmailVerificationPendingProps) {
  // Função para simular o reenvio do email


  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="flex flex-col items-center justify-center  px-4 space-y-6 text-center lg:w-1/2">
        {" "}
        <div className="rounded-full bg-primary/10 p-3">
          <Mail className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verifique seu email</h1>
          <p className="text-muted-foreground">
            Enviamos um link de confirmação para{" "}
            <span className="font-medium">{email}</span>
          </p>
          <p>
            Para ativar sua conta e começar a usar a plataforma, clique no link
            que enviamos. Caso não encontre o e-mail na sua{" "}
            <span className="font-bold">caixa de entrada</span>, verifique
            também a <span className="font-bold">caixa de spam</span> ou{" "}
            <span className="font-bold">lixo eletrônico</span>.
          </p>
        </div>
        <div className="space-y-4 w-full">
         {/*  <Button
            variant="outline"
            className="w-full"
            onClick={handleResendEmail}
          >
            Reenviar email
          </Button> */}
        </div>
      </div>
    </div>
  );
}
