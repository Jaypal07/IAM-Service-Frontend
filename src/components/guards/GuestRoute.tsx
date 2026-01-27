/**
 * Guest Route Guard
 * Single Responsibility: Protect routes for unauthenticated users only
 */

import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { APP_ROUTES } from '@/constants';

export const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
