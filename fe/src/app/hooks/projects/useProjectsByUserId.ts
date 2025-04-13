import { queryKeys } from "@/app/config/queryKeys";
import { projectsService } from "@/app/services/projectsService";
import { ProjectFilters } from "@/app/services/projectsService/getAllByUserId";
import { useQuery } from "@tanstack/react-query";

export const useProjectsByUserId = (userId: string, filters: ProjectFilters = {}) => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.PROJECTS],
    queryFn: () => projectsService.getAllByUserId(userId, filters),
  });

  return {
    projects: data ?? [],
    isFetchingProjects: isFetching,
    refechProjects: refetch,
  };
};
