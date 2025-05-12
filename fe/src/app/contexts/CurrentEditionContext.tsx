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

  
  const { data: currentEdition, isFetching } = useQuery({
    queryKey: [queryKeys.CURRENT_EDITION],
    queryFn: () => editionsService.getCurrent(),
    enabled: true,
    staleTime: Infinity,
  });
    const { data: currentPeriod, isFetching: isFechingCurrentPeriod } = useQuery({
    enabled: true,
    queryKey: [queryKeys.CURRENT_PERIOD],
    queryFn: () => periodsService.getCurrent(),
    staleTime: Infinity,
  });

  console.log("currentEdition", currentEdition);
  console.log("currentPeriod", currentPeriod);


  const loading = isFechingCurrentPeriod || isFetching;

  return (
    <CurrentEditionContext.Provider
      value={{
        currentEdition: currentEdition,
        isLoadingCurrentEdition: loading,
        currentPeriod: currentPeriod,
      }}
    >
      {children}
    </CurrentEditionContext.Provider>
  );
};
