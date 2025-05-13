import { Project } from "@/app/entities/Project";
import { StatusProject } from "@/app/entities/StatusProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock } from "lucide-react";

interface ProjectsStatboxContainerProps {
  projects: Project[];
}

export const ProjectsStatboxContainer = ({
  projects,
}: ProjectsStatboxContainerProps) => {
  const pendingProjects = projects.filter(
    (project) => project.status === StatusProject.SUBMITTED
  );
  const filteredDraftProjects = projects.filter(
    (project) => project.status !== StatusProject.DRAFT
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Projetos Cadastrados
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {filteredDraftProjects.length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Projetos pendentes de avaliação
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingProjects.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};
