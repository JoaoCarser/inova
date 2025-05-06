import { ErrorBoundary } from "./components/ErrorBoundary";
import { ErrorBoundaryFallback } from "./components/ErrorBoundaryFallback";
import { Router } from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { useAuth } from "./app/hooks/useAuth";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { CurrentEditionProvider } from "./app/contexts/CurrentEditionContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Sempre remove o tema de marketing antes
    document.body.classList.remove("theme-marketing");

    if (user.role === "MARKETING") {
      document.body.classList.add("theme-marketing");
    }
    // Se não for marketing, o body fica sem classe extra e usa o :root normal
  }, [user]);
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <QueryClientProvider client={queryClient}>
        <CurrentEditionProvider>
          <AuthProvider>
            <ThemeProvider>
              <Router />
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </CurrentEditionProvider>
        <ReactQueryDevtools position="bottom" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
