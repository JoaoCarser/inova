import LoadingScreen from "@/components/LoadingScreen";

import Login from "@/view/pages/Login";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { LoginLayout } from "@/view/Layouts/LoginLayout";
import Register from "@/view/pages/Register";
import AppLayout from "@/view/Layouts/AppLayout";
import ConfirmEmail from "@/view/pages/ConfirmEmail";
const Home = lazy(() => import("@/view/pages/Home"));
const Projects = lazy(() => import("@/view/pages/Projects"));
const Participants = lazy(() => import("@/view/pages/Participants"));
const Editions = lazy(() => import("@/view/pages/Editions"));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<LoginLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/participants" element={<Participants />} />
              <Route path="/editions" element={<Editions />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
