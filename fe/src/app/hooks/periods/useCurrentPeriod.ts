import { queryKeys } from "@/app/config/queryKeys";
import { periodsService } from "@/app/services/periodsService";
import { useQuery } from "@tanstack/react-query";

export const useCurrentPeriod = () => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.CURRENT_PERIOD],
    queryFn: () => periodsService.getCurrent(),
  });

  return {
    currentPeriod: data ?? null,
    isFetchingCurrenPeriod: isFetching,
    refechCurrenPeriod: refetch,
  };
};
