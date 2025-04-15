import { useProjectsByUserId } from "@/app/hooks/projects/useProjectsByUserId";
import { useAuth } from "@/app/hooks/useAuth";
import { useProjectFilters } from "@/app/hooks/useProjectFilters";
import { ProjectCard } from "@/components/ProjectCard";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "@/view/dialogs/CreateProjectDialog";
import { ProjectFilters } from "@/view/dialogs/CreateProjectDialog/components/ProjectFilters";
import { useEffect } from "react";

export default function Projects() {
  const { user } = useAuth();
  const { filters, setFilters } = useProjectFilters();

  const { projects, isFetchingProjects, refechProjects } = useProjectsByUserId(
    user?.id!,
    filters
  );

  useEffect(() => {
    refechProjects();
  }, [filters]);

  // Filter projects based on current filters

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div>
          {" "}
          <h1 className="text-2xl font-bold">Projetos</h1>
          <p className="text-lg text-green-600 mt-2">
            Acompanhe aqui os seus projetos no concurso Inova Conterp
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <ProjectFilters onFilterChange={setFilters} />

      {isFetchingProjects ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          {projects.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-gray-500">
                Nenhum projeto encontrado com os filtros selecionados.
              </p>
              <Button
                variant="link"
                onClick={() => setFilters({ title: "", status: [], department: [] })}
                className="mt-2"
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
