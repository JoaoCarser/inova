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
import { useEffect, useState } from "react";
import { filesService } from "@/app/services/filesService";
import { queryKeys } from "@/app/config/queryKeys";
import { useProject } from "@/app/hooks/projects/useProject";
import { Project, ProjectFile } from "@/app/entities/Project";
import { UpdateProjectParams } from "@/app/services/projectsService/update";
import { handleAxiosError } from "@/app/utils/handleAxiosError";

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
  participants: z.array(participantSchema).min(1, "Adicione pelo menos um participante"),
});

type FormData = z.infer<typeof schema>;

export const useEditProjectDialog = (project: Project, onSuccess?: () => void) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  //const {} = useProject(projectId);
  const [filesToUpload, setFilesToUpload] = useState<{ File: File }[]>([]);
  const [submitStatus, setSubmitStatus] = useState<StatusProject>(StatusProject.DRAFT);

  const [uploadedFiles, setUploadedFiles] = useState<ProjectFile[]>(project.files);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: project?.name,
      department: project?.department,
      description: project?.description,
      videoLink: project?.videoLink,
      participants: project?.usersProjects.map((up) => ({
        id: up.user.id,
        name: up.user.name,
        email: up.user.email,
      })),
    },
  });

  useEffect(() => {
    if (project) {
      // reset({});
    }
  }, [project, reset]);

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.CREATE_PROJECT],
    mutationFn: async (data: UpdateProjectParams) => {
      return projectsService.update(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [queryKeys.PROJECTS] });
    },
  });

  const { isPending: isLoadingUploadFiles, mutateAsync: mutateUploadFiles } = useMutation(
    {
      mutationFn: filesService.uploadProjectFile,
    }
  );

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        status: submitStatus,
        id: project.id,
      }); //Retorno da mutation Function

      for (const file of filesToUpload) {
        await mutateUploadFiles({ file: file.File, projectId: project.id });
      }

      await queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

      toast({
        variant: "default",
        title: "Projeto editado com sucesso!",
        description: "Você pode ver o projeto no painel de projetos.",
        duration: 5000,
      });

      reset(); // Limpa o formulário
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
    filesToUpload,
    setFilesToUpload,
    open,
    setOpen,
    uploadedFiles,
    setUploadedFiles,
    setSubmitStatus,
    submitStatus,
  };
};
