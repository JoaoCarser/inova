import { queryKeys } from "@/app/config/queryKeys";
import { periodsService } from "@/app/services/periodsService";
import { useQuery } from "@tanstack/react-query";

export const usePeriods = () => {
  const { data, isFetching, refetch } = useQuery({
    enabled: true,
    queryKey: [queryKeys.PERIODS],
    queryFn: () => periodsService.getAll(),
  });

  return {
    periods: data ?? [],
    isFetchingPeriods: isFetching,
    refechPeriods: refetch,
  };
};
