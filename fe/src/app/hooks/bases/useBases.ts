import { queryKeys } from "@/app/config/queryKeys";
import { basesService } from "@/app/services/basesService";
import { useQuery } from "@tanstack/react-query";

export const useBases = () => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.BASES],
    queryFn: () => basesService.getAll(),
  });

  return {
    bases: data ?? [],
    isFetchingBases: isFetching,
    refechBases: refetch,
  };
};
