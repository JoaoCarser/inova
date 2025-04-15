import { queryKeys } from "@/app/config/queryKeys";
import { Role } from "@/app/entities/Role";
import { projectsService } from "@/app/services/projectsService";
import { ProjectFilters } from "@/app/services/projectsService/getAllByUserId";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (userRole: Role, filters: ProjectFilters = {}) => {
  const { data, isFetching, refetch } = useQuery({
    enabled: userRole === Role.EVALUATION_COMMITTEE || userRole === Role.MARKETING,
    queryKey: [queryKeys.PROJECTS],
    queryFn: () => projectsService.getAll(filters),
  });

  return {
    projects: data ?? [],
    isFetchingProjects: isFetching,
    refechProjects: refetch,
  };
};
