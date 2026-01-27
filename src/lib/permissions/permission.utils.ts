/**
 * Permission Utilities
 * Helper functions for role and permission checking
 */

import type { UserResponse, RoleDto, PermissionDto } from '@/types';
import { RoleType, PermissionType } from '@/types/roles-permissions.types';

/**
 * Check if user has a specific role
 */
export const hasRole = (user: UserResponse | null, role: RoleType): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.some((r: RoleDto) => r.name === role);
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user: UserResponse | null, roles: RoleType[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.some(role => hasRole(user, role));
};

/**
 * Check if user has all of the specified roles
 */
export const hasAllRoles = (user: UserResponse | null, roles: RoleType[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.every(role => hasRole(user, role));
};

/**
 * Check if user has a specific permission
 */
export const hasPermission = (user: UserResponse | null, permission: PermissionType): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.some((p: PermissionDto) => p.name === permission);
};

/**
 * Check if user has any of the specified permissions
 */
export const hasAnyPermission = (user: UserResponse | null, permissions: PermissionType[]): boolean => {
    if (!user || !user.permissions) return false;
    return permissions.some(permission => hasPermission(user, permission));
};

/**
 * Check if user has all of the specified permissions
 */
export const hasAllPermissions = (user: UserResponse | null, permissions: PermissionType[]): boolean => {
    if (!user || !user.permissions) return false;
    return permissions.every(permission => hasPermission(user, permission));
};

/**
 * Check if user is an admin
 */
export const isAdmin = (user: UserResponse | null): boolean => {
    return hasRole(user, RoleType.ROLE_ADMIN);
};

/**
 * Check if user is an owner
 */
export const isOwner = (user: UserResponse | null): boolean => {
    return hasRole(user, RoleType.ROLE_OWNER);
};

/**
 * Check if user is admin or owner
 */
export const isAdminOrOwner = (user: UserResponse | null): boolean => {
    return hasAnyRole(user, [RoleType.ROLE_ADMIN, RoleType.ROLE_OWNER]);
};

/**
 * Get user's role names as array of strings
 */
export const getUserRoleNames = (user: UserResponse | null): string[] => {
    if (!user || !user.roles) return [];
    return user.roles.map((r: RoleDto) => r.name);
};

/**
 * Get user's permission names as array of strings
 */
export const getUserPermissionNames = (user: UserResponse | null): string[] => {
    if (!user || !user.permissions) return [];
    return user.permissions.map((p: PermissionDto) => p.name);
};

/**
 * Permission-specific helper functions
 */
export const canCreateUser = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.USER_CREATE);
};

export const canReadUser = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.USER_READ);
};

export const canUpdateUser = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.USER_UPDATE);
};

export const canDisableUser = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.USER_DISABLE);
};

export const canAssignRoles = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.USER_ROLE_ASSIGN);
};

export const canReadAuditLogs = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.AUDIT_READ);
};

export const canManageRoles = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.ROLE_MANAGE);
};

export const canManagePermissions = (user: UserResponse | null): boolean => {
    return hasPermission(user, PermissionType.PERMISSION_MANAGE);
};
