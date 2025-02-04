import LoadingScreen from "@/components/LoadingScreen";
import Home from "@/view/pages/Home";
import Login from "@/view/pages/Login";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { AuthLayout } from "@/view/Layouts/AuthLayout";
import Register from "@/view/pages/Register";

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
