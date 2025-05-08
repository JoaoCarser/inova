import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailVerificationPendingProps {
  email: string;
}

export function EmailVerificationPending({
  email,
}: EmailVerificationPendingProps) {
  // Função para simular o reenvio do email
  const handleResendEmail = () => {
    alert(`Email de verificação reenviado para ${email}`);
  };
  console.log("EmailVerificationPending");

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center bg-red-500 lg:w-1/2 m-auto">
      <div className="rounded-full bg-primary/10 p-3">
        <Mail className="h-10 w-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Verifique seu email</h1>
        <p className="text-muted-foreground">
          Enviamos um link de confirmação para{" "}
          <span className="font-medium">{email}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Clique no link enviado para ativar sua conta e começar a usar a
          plataforma.
        </p>
      </div>

      <div className="space-y-4 w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResendEmail}
        >
          Reenviar email
        </Button>
      </div>
    </div>
  );
}
