import { ErrorBoundary } from "./components/ErrorBoundary";
import { ErrorBoundaryFallback } from "./components/ErrorBoundaryFallback";
import { Router } from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./app/contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
