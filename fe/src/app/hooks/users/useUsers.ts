import { queryKeys } from "@/app/config/queryKeys";
import { usersService } from "@/app/services/usersService";
import { GetAllUsersFilters } from "@/app/services/usersService/getAll";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (filters: GetAllUsersFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [queryKeys.USERS],
    queryFn: () => usersService.getAll(filters),
  });

  return {
    users: data ?? [],
    isFetchingUsers: isFetching,
    refechUsers: refetch,
  };
};
