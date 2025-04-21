import { useState } from "react";
import {
  Briefcase,
  Pencil,
  Clock,
  EllipsisVertical,
  Users,
  Clock1,
  CheckCheck,
  Check,
  AlertCircle,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { differenceInDays } from "date-fns";
import { Project } from "@/app/entities/Project";
import { StatusProject } from "@/app/entities/StatusProject";
import { translatedDepartments } from "@/app/utils/translatedDepartments";
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
import { Badge } from "./ui/badge";
import { ProjectDetailDialog, statusConfig } from "./ProjectDetailDialog";
import { is } from "date-fns/locale";
import { Role } from "@/app/entities/Role";
import { Button } from "./ui/button";
import { EvaluationDialog } from "@/view/dialogs/EvaluationDialog";
import { calculateAverageScore } from "@/app/utils/evaluationUtils";
import { useAuth } from "@/app/hooks/useAuth";

interface ProjectCardProps {
  project: Project;
  userRole: Role;
}

export function ProjectCard({ project, userRole }: ProjectCardProps) {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

  // Extract user names for display
  const userNames = project.usersProjects.map((up) => up.user.name).join(", ");

  console.log(user);

  const userAlreadyEvaluated = project.evaluations.find(
    (evaluation) => evaluation.evaluatorId === user?.id!
  );

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

  // Calculate average score
  const { averageScore, evaluationCount } = calculateAverageScore(project.evaluations);

  // Determine if we should show the score (only for reviewed or under review projects)
  const showScore =
    project.status === StatusProject.SUBMITTED ||
    project.status === StatusProject.REVIEWED ||
    (project.status === StatusProject.UNDER_REVIEW && evaluationCount > 0);

  return (
    <>
      <Card className="group relative  flex flex-col cursor-pointer hover:shadow-md transition-shadow border-gray-200">
        {/* Action buttons - visible on hover */}

        <CardHeader className="pb-2  flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700 line-clamp-1">
            {project.name}
          </CardTitle>
          {/* Score badge - if project has evaluations */}
          {showScore && (
            <Badge className="bg-yellow-100 text-yellow-800 font-medium">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 mr-1" />
              {averageScore.toFixed(1)}
            </Badge>
          )}
          <div
            className="flex items-center justify-center mb-2 text-gray-600 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            {" "}
            <EllipsisVertical />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-gray-500 text-sm line-clamp-3">{project.description}</p>

          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-gray-400 shrink-0" />
              <span className="line-clamp-1">{userNames}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase size={16} className="text-gray-400 shrink-0" />
              <span>
                {translatedDepartments.find((d) => d.value === project.department)?.label}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400 shrink-0" />
              <span>Há {differenceInDays(new Date(), project.createdAt)} dias</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle size={16} className="text-gray-400 shrink-0" />
              <span>Status:</span>
              <Badge
                className={`${statusConfig[project.status].color} font-normal`}
                variant="outline"
              >
                <span className="flex items-center gap-1">
                  {statusConfig[project.status].icon}
                  {statusConfig[project.status].label}
                </span>
              </Badge>
            </div>
          </div>
          {userRole === Role.EVALUATION_COMMITTEE && (
            <div>
              <EvaluationDialog
                project={project}
                isOpen={isEvaluationModalOpen}
                onClose={() => setIsEvaluationModalOpen(false)}
                setOpen={setIsEvaluationModalOpen}
              />
            </div>
          )}

          {userRole === Role.EVALUATION_COMMITTEE && (
            <div className="w-full">
              <Button
                className="w-full"
                onClick={() => setIsEvaluationModalOpen(true)}
                disabled={!!userAlreadyEvaluated}
              >
                {userAlreadyEvaluated
                  ? "Você já avaliou este projeto"
                  : "Avaliar Projeto"}
              </Button>
            </div>
          )}
          {/* Evaluation count - if project has evaluations */}
          {/*     {evaluationCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star size={16} className="text-gray-400 shrink-0" />
              <span>
                {evaluationCount} {evaluationCount === 1 ? "avaliação" : "avaliações"}
              </span>
            </div>
          )} */}
        </CardContent>
      </Card>

      <ProjectDetailDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        project={project}
        userNames={userNames}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        userRole={userRole}
        userId={user?.id!}
      />

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
