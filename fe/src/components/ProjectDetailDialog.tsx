import { Project } from "@/app/entities/Project";
import { translatedDepartments } from "@/app/utils/translatedDepartments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  CheckCircle,
  CheckIcon,
  Clock,
  Download,
  FileText,
  HourglassIcon,
  Star,
  Users,
} from "lucide-react";
import { FileIcon } from "./FileIcon";
import { Badge } from "./ui/badge";
import { StatusProject } from "@/app/entities/StatusProject";
import { differenceInDays } from "date-fns";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { EditProjectDialog } from "@/view/dialogs/EditProjectDialog";
import { Role } from "@/app/entities/Role";
import { EvaluationCriterionName } from "@/app/entities/EvaluationCriterionName";
import { calculateAverageScore } from "@/app/utils/evaluationUtils";
import { criterionLabels } from "@/app/utils/criterionLabels";
import { Progress } from "./ui/progress";
import { useState } from "react";

interface ProjectDialogDetailsProps {
  project: Project;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userNames: string;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: Role;
}

export const statusConfig = {
  [StatusProject.DRAFT]: {
    label: "Rascunho",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-700",
  },
  [StatusProject.SUBMITTED]: {
    label: "Submetido",
    icon: <CheckIcon className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-700",
  },
  [StatusProject.UNDER_REVIEW]: {
    label: "Em Avaliação",
    icon: <HourglassIcon className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-700",
  },
  [StatusProject.REVIEWED]: {
    label: "Avaliado",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-100 text-green-700",
  },
};

export const ProjectDetailDialog = ({
  isDialogOpen,
  project,
  setIsDialogOpen,
  userNames,
  userRole,
  setIsDeleteDialogOpen,
}: ProjectDialogDetailsProps) => {
  // Calculate average scores
  const { averageScore, evaluationCount, criteriaAverages } = calculateAverageScore(
    project.evaluations
  );
  const [_activeTab, setActiveTab] = useState("details");

  // Determine if we should show evaluations tab
  const showEvaluations = project.evaluations.length > 0;

  return (
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

        <Tabs defaultValue="details" className="mt-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="evaluations" disabled={!showEvaluations}>
              Avaliações {evaluationCount > 0 && `(${evaluationCount})`}
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6 py-4">
            <TabsContent value="details" className="space-y-6 py-4">
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
              <div>
                <h3 className="text-md font-medium text-gray-500 mb-2">Arquivos</h3>
                {project.files.length === 0 ? (
                  <p className="text-gray-500 italic">Nenhum arquivo disponível</p>
                ) : (
                  <div className="border rounded-md divide-y">
                    {project.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <FileIcon filePath={file.path} />
                          <div>
                            <p className="text-sm font-medium">{file.originalName}</p>
                            <p className="text-xs text-gray-500">
                              {/*   {formatFileSize(file.size)} */}
                            </p>
                          </div>
                        </div>
                        <a
                          href={file.path}
                          className="h-8 w-8 p-0"
                          target="_blank"
                          //onClick={() => handleDownloadFile(file)}
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-500 mb-2">Status:</h3>
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

              <div>
                <h3 className="text-md font-medium text-gray-500 mb-2">
                  Data de criação
                </h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-800">
                    Há {differenceInDays(new Date(), project.createdAt)} dias
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="evaluations" className="space-y-6 py-4">
              {/* Average scores section */}
              {evaluationCount > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-gray-700 mb-3">
                    Pontuação Média
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(averageScore)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{averageScore.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">
                      ({evaluationCount}{" "}
                      {evaluationCount === 1 ? "avaliação" : "avaliações"})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(criteriaAverages).map(([criterion, score]) => (
                      <div key={criterion} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {criterionLabels[criterion as EvaluationCriterionName] ||
                              criterion}
                          </span>
                          <span className="font-medium">{score.toFixed(1)}</span>
                        </div>
                        <Progress value={score * 20} className="h-2" />{" "}
                        {/* Convert 0-5 to 0-100 */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual evaluations */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-700">
                  Avaliações Individuais
                </h3>
                {project.evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const avgScore =
                            evaluation.criteria.reduce((sum, c) => sum + c.score, 0) /
                            evaluation.criteria.length;
                          return (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(avgScore)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {evaluation.comments && (
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        <p className="italic">{evaluation.comments}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {evaluation.criteria.map((criterion) => (
                        <div key={criterion.name} className="flex justify-between">
                          <span className="text-gray-600">
                            {criterionLabels[criterion.name as EvaluationCriterionName] ||
                              criterion.name}
                            :
                          </span>
                          <span className="font-medium">{criterion.score}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {userRole === Role.PARTICIPANT && (
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
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
