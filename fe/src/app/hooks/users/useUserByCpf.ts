import { queryKeys } from "@/app/config/queryKeys";
import { usersService } from "@/app/services/usersService";
import { useQuery } from "@tanstack/react-query";

export const useUserByCpf = (cpf: string) => {
  const { data, isFetching, refetch } = useQuery({
    enabled: !!cpf,
    queryKey: [queryKeys.USER_CPF],
    queryFn: () => usersService.getByCpf(cpf),
  });

  return {
    userCpf: data,
    isFetchingUserByCpf: isFetching,
    refechUserByCpf: refetch,
  };
};
