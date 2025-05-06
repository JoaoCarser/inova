import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { projectsService } from "@/app/services/projectsService";
import { CreateProjectParams } from "@/app/services/projectsService/create";
import { StatusProject } from "@/app/entities/StatusProject";
import { ProjectDepartment } from "@/app/entities/ProjectDepartament";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import { filesService } from "@/app/services/filesService";
import { queryKeys } from "@/app/config/queryKeys";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { useCurrentEdition } from "@/app/hooks/useCurrentEdition";

const participantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

const schema = z.object({
  name: z.string().min(1, "Nome do projeto é obrigatório."),
  department: z.nativeEnum(ProjectDepartment),
  description: z.string().min(1, "Descrição do projeto é obrigatório."),
  videoLink: z.string().optional(),
  participants: z
    .array(participantSchema)
    .min(1, "Adicione pelo menos um participante"),
});

type FormData = z.infer<typeof schema>;

export const useCreateProjectDialog = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filesToUpload, setFilesToUpload] = useState<{ File: File }[]>([]);
  const { currentEdition } = useCurrentEdition();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      participants: [
        {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
      ],
    },
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.CREATE_PROJECT],
    mutationFn: async (data: CreateProjectParams) => {
      return projectsService.create(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [queryKeys.PROJECTS] });
    },
  });

  const { isPending: isLoadingUploadFiles, mutateAsync: mutateUploadFiles } =
    useMutation({
      mutationFn: filesService.uploadProjectFile,
    });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const project = await mutateAsync({
        ...data,
        editionId: currentEdition?.id!,
        status: StatusProject.DRAFT,
      });

      for (const file of filesToUpload) {
        await mutateUploadFiles({ file: file.File, projectId: project.id });
      }

      console.log("project response", project);

      toast({
        variant: "default",
        title: "Projeto cadastrado com sucesso!",
        description: "Você pode ver o projeto no painel de projetos.",
        duration: 5000,
      });

      reset(); // Limpa o formulário
      setFilesToUpload([]);
      onSuccess?.(); // Fecha o modal (callback passada)
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    control,
    isLoading: isLoading || isLoadingUploadFiles,
    currentEdition,
    filesToUpload,
    setFilesToUpload,
  };
};
