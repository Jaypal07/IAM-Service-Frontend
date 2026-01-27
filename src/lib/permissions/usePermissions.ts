/**
 * Permission Hook
 * Provides permission checking methods for current user
 */

import { useAuthStore } from '@/features/auth/store/auth.store';
import * as permissionUtils from './permission.utils';
import { RoleType, PermissionType } from '@/types/roles-permissions.types';

export const usePermissions = () => {
    const user = useAuthStore((state) => state.user);

    return {
        // Role checks
        hasRole: (role: RoleType) => permissionUtils.hasRole(user, role),
        hasAnyRole: (roles: RoleType[]) => permissionUtils.hasAnyRole(user, roles),
        hasAllRoles: (roles: RoleType[]) => permissionUtils.hasAllRoles(user, roles),
        isAdmin: permissionUtils.isAdmin(user),
        isOwner: permissionUtils.isOwner(user),
        isAdminOrOwner: permissionUtils.isAdminOrOwner(user),

        // Permission checks
        hasPermission: (permission: PermissionType) => permissionUtils.hasPermission(user, permission),
        hasAnyPermission: (permissions: PermissionType[]) => permissionUtils.hasAnyPermission(user, permissions),
        hasAllPermissions: (permissions: PermissionType[]) => permissionUtils.hasAllPermissions(user, permissions),

        // Permission-specific helpers
        canCreateUser: permissionUtils.canCreateUser(user),
        canReadUser: permissionUtils.canReadUser(user),
        canUpdateUser: permissionUtils.canUpdateUser(user),
        canDisableUser: permissionUtils.canDisableUser(user),
        canAssignRoles: permissionUtils.canAssignRoles(user),
        canReadAuditLogs: permissionUtils.canReadAuditLogs(user),
        canManageRoles: permissionUtils.canManageRoles(user),
        canManagePermissions: permissionUtils.canManagePermissions(user),

        // User info
        roleNames: permissionUtils.getUserRoleNames(user),
        permissionNames: permissionUtils.getUserPermissionNames(user),
    };
};
