import { useState } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserByCpf } from "@/app/hooks/users/useUserByCpf";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  email: string;
}

interface ParticipantSelectorProps {
  value: Participant[];
  onChange: (participants: Participant[]) => void;
}

export function ParticipantSelector({
  value = [],
  onChange,
}: ParticipantSelectorProps) {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { isFetchingUserByCpf, refechUserByCpf } = useUserByCpf(cpf);

  const addParticipant = async () => {
    if (!cpf.trim()) return;
    setError(null); // limpa erro anterior

    try {
      const result = await refechUserByCpf(); // busca usuário via API
      console.log(result);

      if (result?.isError || !result?.data) {
        //@ts-ignore
        setError(result?.error?.response.data.message);
        return;
      }

      const newUser = result.data;

      const newParticipant: Participant = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      const alreadyExists = value.some((p) => p.id === newUser.id);
      if (alreadyExists) {
        setError("Este participante já foi adicionado.");
        return;
      }

      onChange([...value, newParticipant]);
      setCpf(""); // limpa input
    } catch (err) {
      console.log("err");
      console.log(err);
      setError("Erro ao buscar usuário. Tente novamente.");
    }
  };

  const removeParticipant = (id: string) => {
    onChange(value.filter((p) => p.id !== id));
  };

  return (
    <div className={cn("space-y-4 w-full")}>
      {value.length > 0 && (
        <div className="border rounded-md p-3 space-y-2">
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {value.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center justify-between bg-muted p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-muted-foreground ml-2">
                      ({participant.email})
                    </span>
                  </div>
                </div>
                {!(index === 0) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeParticipant(participant.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-2">
              <div className="md:col-span-5">
                <Input
                  placeholder="CPF do participante"
                  type="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  error={error ?? ""}
                />
              </div>

              <div className="md:col-span-3">
                <Button
                  type="button"
                  size="sm"
                  onClick={addParticipant}
                  disabled={!cpf.trim() || isFetchingUserByCpf}
                  isLoading={isFetchingUserByCpf}
                  className="w-full"
                >
                  <span className=" flex  items-center justify-around">
                    Adicionar participante
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
