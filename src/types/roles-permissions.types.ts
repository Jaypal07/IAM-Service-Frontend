/**
 * Role Types
 */
export const RoleType = {
    ROLE_USER: 'ROLE_USER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_OWNER: 'ROLE_OWNER'
} as const;

export type RoleType = typeof RoleType[keyof typeof RoleType];

/**
 * Permission Types
 */
export const PermissionType = {
    USER_CREATE: 'USER_CREATE',
    USER_READ: 'USER_READ',
    USER_UPDATE: 'USER_UPDATE',
    USER_DISABLE: 'USER_DISABLE',
    USER_ROLE_ASSIGN: 'USER_ROLE_ASSIGN',
    ROLE_READ: 'ROLE_READ',
    ROLE_MANAGE: 'ROLE_MANAGE',
    PERMISSION_READ: 'PERMISSION_READ',
    PERMISSION_MANAGE: 'PERMISSION_MANAGE',
    TOKEN_REVOKE: 'TOKEN_REVOKE',
    SESSION_TERMINATE: 'SESSION_TERMINATE',
    RATE_LIMIT_RESET: 'RATE_LIMIT_RESET',
    AUDIT_READ: 'AUDIT_READ'
} as const;

export type PermissionType = typeof PermissionType[keyof typeof PermissionType];

/**
 * Role display names
 */
export const ROLE_NAMES: Record<RoleType, string> = {
    [RoleType.ROLE_USER]: 'User',
    [RoleType.ROLE_ADMIN]: 'Administrator',
    [RoleType.ROLE_OWNER]: 'Owner'
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<RoleType, string> = {
    [RoleType.ROLE_USER]: 'Default authenticated user with basic access',
    [RoleType.ROLE_ADMIN]: 'IAM administrator with elevated privileges for user management',
    [RoleType.ROLE_OWNER]: 'IAM system owner with full access to all features'
};

/**
 * Permission display names
 */
export const PERMISSION_NAMES: Record<PermissionType, string> = {
    [PermissionType.USER_CREATE]: 'Create Users',
    [PermissionType.USER_READ]: 'Read User Information',
    [PermissionType.USER_UPDATE]: 'Update User Information',
    [PermissionType.USER_DISABLE]: 'Disable User Accounts',
    [PermissionType.USER_ROLE_ASSIGN]: 'Assign Roles to Users',
    [PermissionType.ROLE_READ]: 'Read Roles',
    [PermissionType.ROLE_MANAGE]: 'Manage Roles',
    [PermissionType.PERMISSION_READ]: 'Read Permissions',
    [PermissionType.PERMISSION_MANAGE]: 'Manage Permissions',
    [PermissionType.TOKEN_REVOKE]: 'Revoke Tokens',
    [PermissionType.SESSION_TERMINATE]: 'Terminate Sessions',
    [PermissionType.RATE_LIMIT_RESET]: 'Reset Rate Limits',
    [PermissionType.AUDIT_READ]: 'Read Audit Logs'
};
