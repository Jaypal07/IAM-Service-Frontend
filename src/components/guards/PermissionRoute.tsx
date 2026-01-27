/**
 * Permission-Based Route Guard
 * Protects routes that require specific permissions
 */

import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { hasAnyPermission } from '@/lib/permissions/permission.utils';
import { APP_ROUTES } from '@/constants';
import type { PermissionType } from '@/types/roles-permissions.types';

interface PermissionRouteProps {
    requiredPermissions: PermissionType[];
    redirectTo?: string;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({ 
    requiredPermissions, 
    redirectTo = APP_ROUTES.HOME 
}) => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    console.log('🔐 PermissionRoute check:', {
        isAuthenticated,
        hasUser: !!user,
        userPermissions: user?.permissions?.map(p => p.name),
        requiredPermissions,
        hasAccess: hasAnyPermission(user, requiredPermissions)
    });

    if (!isAuthenticated) {
        console.log('❌ Not authenticated, redirecting to login');
        return <Navigate to={APP_ROUTES.LOGIN} replace />;
    }

    if (!hasAnyPermission(user, requiredPermissions)) {
        console.log('❌ Insufficient permissions, redirecting to:', redirectTo);
        return <Navigate to={redirectTo} replace />;
    }

    console.log('✅ Permission check passed, allowing access');
    return <Outlet />;
};
