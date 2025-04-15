import LoadingScreen from "@/components/LoadingScreen";

import Login from "@/view/pages/Login";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { LoginLayout } from "@/view/Layouts/LoginLayout";
import Register from "@/view/pages/Register";
import AppLayout from "@/view/Layouts/AppLayout";

import { useAuth } from "@/app/hooks/useAuth";

const Home = lazy(() => import("@/view/pages/Home"));
const Projects = lazy(() => import("@/view/pages/Projects"));
const EvaluationCommitteeDashboard = lazy(
  () => import("@/view/pages/EvaluationCommitteeDashboard")
);

export const Router = () => {
  const { user } = useAuth();
  const getHomeRoute = () => {
    if (user?.role === "EVALUATION_COMMITTEE") {
      return <EvaluationCommitteeDashboard />;
    }
    return <Home />;
  };
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<LoginLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={getHomeRoute()} />
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
