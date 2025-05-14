import LoadingScreen from "@/components/LoadingScreen";

import Login from "@/view/pages/Login";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { LoginLayout } from "@/view/Layouts/LoginLayout";
import AppLayout from "@/view/Layouts/AppLayout";
const Register = lazy(() => import("@/view/pages/Register"));
const ConfirmEmail = lazy(() => import("@/view/pages/ConfirmEmail"));
const ForgotPassword = lazy(() => import("@/view/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/view/pages/ResetPassword"));
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
            <Route path="/login/confirm-email" element={<ConfirmEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
