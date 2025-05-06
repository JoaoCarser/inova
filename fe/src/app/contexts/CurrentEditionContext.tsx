import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { queryKeys } from "../config/queryKeys";
import { editionsService } from "../services/editionsService";
import { Edition } from "../entities/Edition";
import { periodsService } from "../services/periodsService";
import { Period } from "../entities/Period";

interface CurrentEditionContextValue {
  currentEdition: Edition | undefined;
  currentPeriod: Period | undefined;
  isLoadingCurrentEdition: boolean;
}

export const CurrentEditionContext = createContext(
  {} as CurrentEditionContextValue
);

export const CurrentEditionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: currentPeriod, isFetching: isFechingCurrentPeriod } = useQuery({
    enabled: true,
    queryKey: [queryKeys.CURRENT_PERIOD],
    queryFn: () => periodsService.getCurrent(),
    staleTime: Infinity,
  });

  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.CURRENT_EDITION],
    queryFn: () => editionsService.getCurrent(),
    enabled: true,
    staleTime: Infinity,
  });

  return (
    <CurrentEditionContext.Provider
      value={{
        currentEdition: data,
        isLoadingCurrentEdition: isFetching || isFechingCurrentPeriod,
        currentPeriod,
      }}
    >
      {children}
    </CurrentEditionContext.Provider>
  );
};
