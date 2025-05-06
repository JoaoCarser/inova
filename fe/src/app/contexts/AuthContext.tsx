import { useState, createContext, useCallback, useEffect } from "react";
import { User } from "../entities/User";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../config/queryKeys";
import { usersService } from "../services/usersService";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from "@/components/LoadingScreen";
import { useCurrentEdition } from "../hooks/useCurrentEdition";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  user?: User;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //verifica primeiro se o token está salvo no localStorage
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  //Criando o queryClient
  const queryClient = useQueryClient();

  //Hood para o toast
  const { toast } = useToast();

  //hook to editions
  const { isLoadingCurrentEdition } = useCurrentEdition();

  //Função para o signin e aplicar o token no localStorage
  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  //Função para o signout e remover o token do localStorage
  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.invalidateQueries({
      queryKey: [queryKeys.ME],
    });
    setSignedIn(false);
  }, []);

  //Query para pegar o usuário atual
  const { isError, data, isFetching, isSuccess } = useQuery({
    queryKey: [queryKeys.ME],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  //Verifica se houve algum erro na requisição
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Sessão Expirada!.",
        description: "Por favor, faça login novamente.",
      });
      signout();
    }
  }, [isError, signout, data]);

  const isLoading = isFetching || isLoadingCurrentEdition;

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout, user: data }}
    >
      {isLoading && <LoadingScreen />}

      {!isLoading && children}
    </AuthContext.Provider>
  );
};
