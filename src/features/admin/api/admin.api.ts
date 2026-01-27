/**
 * Admin API Service
 * All admin-related API calls
 */

import httpClient from '@/lib/http/http-client';
import { ADMIN_ENDPOINTS } from '@/constants/api.constants';
import type {
    AdminUserCreateRequest,
    AdminUserRoleUpdateRequest,
    DisableUserResponse,
    UserResponse
} from '@/types';

/**
 * Create a new user (Admin only)
 */
export const createUser = async (data: AdminUserCreateRequest): Promise<UserResponse> => {
    const response = await httpClient.post<UserResponse>(ADMIN_ENDPOINTS.BASE, data);
    return response.data;
};

/**
 * Get user by ID (Admin only)
 */
export const getUserById = async (userId: string): Promise<UserResponse> => {
    const response = await httpClient.get<UserResponse>(`${ADMIN_ENDPOINTS.BASE}/${userId}`);
    return response.data;
};

/**
 * Get user by email (Admin only)
 */
export const getUserByEmail = async (email: string): Promise<UserResponse> => {
    const response = await httpClient.get<UserResponse>(ADMIN_ENDPOINTS.BY_EMAIL, {
        params: { email }
    });
    return response.data;
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (): Promise<UserResponse[]> => {
    const response = await httpClient.get<UserResponse[]>(ADMIN_ENDPOINTS.BASE);
    return response.data;
};

/**
 * Update user roles (Admin only)
 * Calculates the diff between current and new roles
 */
export const updateUserRoles = async (
    userId: string,
    currentRoles: string[],
    newRoles: string[]
): Promise<UserResponse> => {
    const addRoles = newRoles.filter(role => !currentRoles.includes(role));
    const removeRoles = currentRoles.filter(role => !newRoles.includes(role));

    // At least one operation is required
    if (addRoles.length === 0 && removeRoles.length === 0) {
        throw new Error('No role changes detected');
    }

    const data: AdminUserRoleUpdateRequest = {
        ...(addRoles.length > 0 && { addRoles }),
        ...(removeRoles.length > 0 && { removeRoles })
    };

    const response = await httpClient.put<UserResponse>(
        `${ADMIN_ENDPOINTS.BASE}/${userId}/roles`,
        data
    );
    return response.data;
};

/**
 * Disable user (Admin only)
 */
export const disableUser = async (userId: string): Promise<DisableUserResponse> => {
    const response = await httpClient.delete<DisableUserResponse>(
        `${ADMIN_ENDPOINTS.BASE}/${userId}`
    );
    return response.data;
};
