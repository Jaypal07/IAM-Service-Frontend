/**
 * Role-Based Route Guard
 * Protects routes that require specific roles
 */

import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { hasAnyRole } from '@/lib/permissions/permission.utils';
import { APP_ROUTES } from '@/constants';
import type { RoleType } from '@/types/roles-permissions.types';

interface RoleRouteProps {
    allowedRoles: RoleType[];
    redirectTo?: string;
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ 
    allowedRoles, 
    redirectTo = APP_ROUTES.HOME 
}) => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    console.log('🎭 RoleRoute check:', {
        isAuthenticated,
        hasUser: !!user,
        userRoles: user?.roles?.map(r => r.name),
        allowedRoles,
        hasAccess: hasAnyRole(user, allowedRoles)
    });

    if (!isAuthenticated) {
        console.log('❌ Not authenticated, redirecting to login');
        return <Navigate to={APP_ROUTES.LOGIN} replace />;
    }

    if (!hasAnyRole(user, allowedRoles)) {
        console.log('❌ Insufficient permissions, redirecting to:', redirectTo);
        return <Navigate to={redirectTo} replace />;
    }

    console.log('✅ Role check passed, allowing access');
    return <Outlet />;
};
