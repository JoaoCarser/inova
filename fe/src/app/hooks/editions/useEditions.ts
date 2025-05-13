import { queryKeys } from "@/app/config/queryKeys";
import { editionsService } from "@/app/services/editionsService";
import { useQuery } from "@tanstack/react-query";

export const useEditions = () => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.EDITIONS],
    queryFn: () => editionsService.getAll(),
  });

  return {
    editions: data ?? [],
    isFetchingEditions: isFetching,
    refechEditions: refetch,
  };
};
