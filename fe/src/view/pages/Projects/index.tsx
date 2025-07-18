import { Role } from "@/app/entities/Role";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ProjectsStatboxContainer } from "@/components/ProjectsStatboxContainer";
import { ProjectFilters } from "@/components/ProjectFilters";
import { ProjectsContext, ProjectsProvider } from "./ProjectsContext";
import { CreateProjectDialog } from "./components/dialogs/CreateProjectDialog";
/* import { ModeToggle } from "@/components/ModeToggle"; */
//handleClearFilters, isLoading, projects, filters, setFilters, user

export default function Projects() {
  return (
    <ProjectsProvider>
      <ProjectsContext.Consumer>
        {({
          handleClearFilters,
          isLoading,
          projects,
          setFilters,
          user,
          currentPeriod,
        }) => (
          <div>
            <Header title="Projetos" />
            {/*  <ModeToggle /> */}
            {(user?.role === Role.EVALUATION_COMMITTEE ||
              user?.role === Role.MARKETING) && (
              <ProjectsStatboxContainer projects={projects} />
            )}

            {/* <EditProjectDialog /> */}

            <ProjectFilters onFilterChange={setFilters} />

            {isLoading && (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )}

            {!isLoading &&
              projects.length === 0 &&
              user?.role !== Role.PARTICIPANT && (
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

            {!isLoading &&
              projects.length === 0 &&
              user?.role === Role.PARTICIPANT &&
              currentPeriod?.type === "SUBSCRIPTION" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CreateProjectDialog />
                </div>
              )}

            {!isLoading &&
              projects.length > 0 &&
              (currentPeriod?.type === "SUBSCRIPTION" ||
                currentPeriod?.type === "AVALIATION") && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      userRole={user?.role!}
                    />
                  ))}
                </div>
              )}
          </div>
        )}
      </ProjectsContext.Consumer>
    </ProjectsProvider>
  );
}
