/**
 * Protected Route Guard
 * Single Responsibility: Protect routes that require authentication
 */

import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { APP_ROUTES } from '@/constants';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  console.log('🛡️ ProtectedRoute check:', {
    isAuthenticated,
    hasUser: !!user,
    hasToken: !!accessToken,
    user: user?.email
  });

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  console.log('✅ Authenticated, allowing access');
  return <Outlet />;
};
