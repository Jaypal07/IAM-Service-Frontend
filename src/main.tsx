import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import SignUp from "./pages/Signup.tsx";
import UserLayout from "./pages/user/UserLayout.tsx";
import UserHome from "./pages/user/UserHome.tsx";
import UserProfile from "./pages/user/UserProfile.tsx";
import OAuthSuccess from "./pages/OAuthSuccess.tsx";
import OAuthFailure from "./pages/OAuthFailure.tsx";
import { ProtectedRoute } from "./components/guards/ProtectedRoute.tsx";
import { GuestRoute } from "./components/guards/GuestRoute.tsx";
import { RoleRoute } from "./components/guards/RoleRoute.tsx";
import { EmailVerify } from "./features/auth/pages/EmailVerify.tsx";
import { ForgotPassword } from "./features/auth/pages/ForgotPassword.tsx";
import { ResetPassword } from "./features/auth/pages/ResetPassword.tsx";
import AdminDashboard from "./features/admin/pages/AdminDashboard.tsx";
import UserManagement from "./features/admin/pages/UserManagement.tsx";
import UserDetails from "./features/admin/pages/UserDetails.tsx";
import { RoleType } from "./types/roles-permissions.types.ts";
import Features from "./pages/Features.tsx";
import Pricing from "./pages/Pricing.tsx";
import Settings from "./pages/user/Settings.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<App />} />
          
          {/* Guest Routes (unauthenticated only) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>

          {/* Auth Flow Routes */}
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes (authenticated only) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<UserLayout />}>
              <Route index element={<UserHome />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Admin Routes (admin/owner only) */}
          <Route element={<RoleRoute allowedRoles={[RoleType.ROLE_ADMIN, RoleType.ROLE_OWNER]} redirectTo="/dashboard" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/users/:userId" element={<UserDetails />} />
          </Route>

          {/* OAuth Routes */}
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          <Route path="/oauth/failure" element={<OAuthFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
