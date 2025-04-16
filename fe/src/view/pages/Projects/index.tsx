import { useEffect, useMemo } from "react";
import { Role } from "@/app/entities/Role";
import { useAuth } from "@/app/hooks/useAuth";
import { useProjects } from "@/app/hooks/projects/useProjects";
import { useProjectsByUserId } from "@/app/hooks/projects/useProjectsByUserId";
import { useProjectFilters } from "@/app/hooks/useProjectFilters";

import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ProjectsStatboxContainer } from "@/components/ProjectsStatboxContainer";
import { CreateProjectDialog } from "@/view/dialogs/CreateProjectDialog";
import { ProjectFilters } from "@/components/ProjectFilters";
import { EditProjectDialog } from "@/view/dialogs/EditProjectDialog";
import { useProjectsContext } from "./ProjectsContext/useProjectsContext";
import { ProjectsContext, ProjectsProvider } from "./ProjectsContext";
//handleClearFilters, isLoading, projects, filters, setFilters, user

export default function Projects() {
  return (
    <ProjectsProvider>
      <ProjectsContext.Consumer>
        {({
          handleClearFilters,
          isLoading,
          projects,
          filters,
          setFilters,
          user,
        }) => (
          <div>
            <Header title="Projetos" />

            {user?.role === Role.EVALUATION_COMMITTEE && (
              <ProjectsStatboxContainer projects={projects} />
            )}

            {user?.role !== Role.EVALUATION_COMMITTEE && (
              <CreateProjectDialog />
            )}

            <EditProjectDialog />

            <ProjectFilters onFilterChange={setFilters} />

            {isLoading && (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )}

            {!isLoading && projects.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
                <p className="text-gray-500">
                  Nenhum projeto encontrado com os filtros selecionados.
                </p>
                <Button
                  variant="link"
                  onClick={handleClearFilters}
                  className="mt-2"
                >
                  Limpar filtros
                </Button>
              </div>
            )}

            {!isLoading && projects.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </ProjectsContext.Consumer>
    </ProjectsProvider>
  );
}
