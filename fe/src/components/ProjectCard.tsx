"use client";

import { useState } from "react";
import {
  Briefcase,
  CalendarDays,
  Pencil,
  Clock,
  EllipsisVertical,
  Trash2,
  Users,
  Clock1,
  CheckCheck,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { differenceInDays } from "date-fns";
import { Project } from "@/app/entities/Project";
import { StatusProject } from "@/app/entities/StatusProject";
import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService } from "@/app/services/projectsService";
import { queryKeys } from "@/app/config/queryKeys";
import { EditProjectDialog } from "@/view/dialogs/EditProjectDialog";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Extract user names for display
  const userNames = project.usersProjects.map((up) => up.user.name).join(", ");

  const statusMessages = {
    [StatusProject.REVIEWED]: {
      message: "O projeto já foi avaliado por todo comitê avaliativo.",
      icon: <CheckCheck className="h-5 w-5" />,
      colors: "text-gray-800 bg-green-300",
    },
    [StatusProject.SUBMITTED]: {
      message: "O projeto já foi submetido para avaliação.",
      icon: <Check className="h-5 w-5" />,
      colors: "text-gray-800 bg-green-300",
    },
    [StatusProject.UNDER_REVIEW]: {
      message: "O projeto está sendo avaliado pelo comitê avaliativo.",
      icon: <Clock1 className="h-5 w-5" />,
      colors: "text-gray-800 bg-gray-300",
    },
    [StatusProject.DRAFT]: {
      message: "O projeto está salvo como rascunho e pode ser editado.",
      icon: <Pencil className="h-5 w-5" />,
      colors: "text-gray-800 bg-gray-300",
    },
  };

  //draft : text-gray-800 bg-gray-300
  //reviwed : text-gray-800 bg-green-300

  // submitted : text-gray-800 bg-green-300
  // under review : text-gray-800 bg-yellow-300
  // reviewed : text-gray-800 bg-red-300

  const { mutateAsync: mutateDeleteProject, isPending: isLoadingDeleteProject } =
    useMutation({
      mutationFn: projectsService.remove,
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: [queryKeys.PROJECTS] });
      },
    });

  const handleDeleteProject = async () => {
    await mutateDeleteProject(project.id);
    queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="w-full border-gray-200  flex flex-col  hover:shadow-md transition-shadow">
        <CardHeader className="pb-2  flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700 line-clamp-1">
            {project.name}
          </CardTitle>
          <div
            className="flex items-center justify-center mb-2 text-gray-600 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            {" "}
            <EllipsisVertical />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-gray-500 text-xs tracking-tight line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Users size={18} className="text-gray-500 shrink-0" />
            <span className="line-clamp-1">{userNames}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">
                {translatedDepartments.find((d) => d.value === project.department)?.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-gray-700 shrink-0" />
              <span>Há {differenceInDays(new Date(), project.createdAt)} dias</span>
            </div>
          </div>

          {project.status && (
            <div className="flex items-center gap-2 text-xs tracking-tight text-white bg-green-500 p-3 rounded">
              <Pencil size={18} className="shrink-0" />
              <span className="line-clamp-2">
                {statusMessages[project.status].message}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md lg:max-w-screen-md max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
                <DialogDescription className="mt-1">
                  Detalhes completos do projeto
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-md font-medium text-gray-500 mb-2">Descrição</h3>
              <p className="text-gray-800">{project.description}</p>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-500 mb-2">Equipe</h3>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <p className="text-gray-800">{userNames}</p>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-500 mb-2">Departamento</h3>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <p className="text-gray-800 uppercase">
                  {
                    translatedDepartments.find(
                      (value) => value.value === project.department
                    )?.label
                  }
                </p>
              </div>
            </div>

            <div className=" w-full">
              <h3 className="text-md font-medium text-gray-500 mb-2">Status</h3>
              <div className="flex items-center gap-2 text-sm text-white bg-primary  p-3 rounded">
                {statusMessages[project.status].icon}
                <span>{statusMessages[project.status].message}</span>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-500 mb-2">Data de criação</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <p className="text-gray-800">
                  Há {differenceInDays(new Date(), project.createdAt)} dias
                </p>
              </div>
            </div>
            <div className="flex justify-center w-full gap-4">
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="w-full"
              >
                Excluir
              </Button>
              <EditProjectDialog className="w-full" project={project} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto "
              {project.name}" e todos os dados associados a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-red-500 hover:bg-red-600"
              isLoading={isLoadingDeleteProject}
            >
              Excluir projeto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
