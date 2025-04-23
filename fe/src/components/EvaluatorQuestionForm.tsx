import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";
import { Project } from "@/app/entities/Project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { questionsService } from "@/app/services/questionsService";
import { useToast } from "@/hooks/use-toast";
const schema = z.object({
  text: z.string().min(1, "Nome é obrigatório."),
});

type FormData = z.infer<typeof schema>;

interface EvaluatorQuestionFormProps {
  project: Project;
}

export function EvaluatorQuestionForm({ project }: EvaluatorQuestionFormProps) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();

  const text = watch("text");

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.QUESTION],
    mutationFn: questionsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(data);

    try {
      await mutateAsync({
        ...data,
        projectId: project.id,
      });

      reset();
      toast({
        variant: "default",
        title: "Pergunta enviada com sucesso!",
        description:
          "Você pode acompanhar a resposta no painel de detalhes do projeto.",
        duration: 5000,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Pergunta</Label>
        <Textarea
          id="text"
          required
          placeholder="Adicione aqui uma breve descrição sobre o projeto"
          {...register("text")}
          error={errors.text?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={!text || isLoading}
        isLoading={isLoading}
        className="w-full"
      >
        <SendHorizontal className="mr-2 h-4 w-4" />
        Enviar pergunta
      </Button>
    </form>
  );
}
