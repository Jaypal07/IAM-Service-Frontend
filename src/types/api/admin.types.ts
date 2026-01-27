/**
 * Admin API Types
 * Types for admin endpoints
 */

import type { UserResponse } from './auth.types';

/**
 * Admin User Create Request
 */
export interface AdminUserCreateRequest {
    name: string;
    email: string;
    password: string;
    roles: string[]; // ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_OWNER']
}

/**
 * Admin User Role Update Request
 * Uses addRoles and removeRoles to specify role changes
 */
export interface AdminUserRoleUpdateRequest {
    addRoles?: string[];
    removeRoles?: string[];
}

/**
 * Admin User Update Request
 */
export interface AdminUserUpdateRequest {
    name?: string;
    image?: string;
    enabled?: boolean;
}

/**
 * Disable User Response
 */
export interface DisableUserResponse {
    message: string;
    userId: string;
}

/**
 * Admin responses reuse UserResponse
 */
export type AdminUserResponse = UserResponse;

/**
 * Get All Users Response
 */
export type GetAllUsersResponse = UserResponse[];
