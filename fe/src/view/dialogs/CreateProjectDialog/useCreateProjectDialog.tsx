import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { projectsService } from "@/app/services/projectsService";
import { CreateProjectParams } from "@/app/services/projectsService/create";
import { StatusProject } from "@/app/entities/StatusProject";
import { ProjectDepartment } from "@/app/entities/ProjectDepartament";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Nome do projeto é obrigatório."),
  department: z.nativeEnum(ProjectDepartment),
  description: z.string().min(1, "Descrição do projeto é obrigatório."),
  videoLink: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useCreateProjectDialog = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.CREATE_PROJECT],
    mutationFn: async (data: CreateProjectParams) => {
      return projectsService.create(data);
    },
  });

  console.log(errors);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const project = await mutateAsync({
        ...data,
        status: StatusProject.DRAFT,
      }); //Retorno da mutation Function

      toast({
        variant: "default",
        title: "Projeto cadastrado com sucesso!",
        description: "Você pode ver o projeto no painel de projetos.",
        duration: 5000,
      });

      reset(); // Limpa o formulário
      onSuccess?.(); // Fecha o modal (callback passada)
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

  return { handleSubmit, register, errors, control };
};
