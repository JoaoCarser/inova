import { queryKeys } from "@/app/config/queryKeys";
import { projectsService } from "@/app/services/projectsService";
import { useQuery } from "@tanstack/react-query";

export const useProject = (projectId: string) => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.PROJECT],
    queryFn: () => projectsService.getById(projectId),
  });

  return {
    project: data ?? null,
    isFetchingProject: isFetching,
    refechProject: refetch,
  };
};
