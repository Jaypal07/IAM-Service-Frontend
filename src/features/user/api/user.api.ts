/**
 * User API Service
 * Single Responsibility: User profile management API calls
 */

import { httpClient } from '@/lib/http';
import { USER_ENDPOINTS } from '@/constants';
import type {
    GetCurrentUserResponse,
    UserUpdateRequest,
    UpdateUserResponse,
} from '@/types';

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
    const response = await httpClient.get<GetCurrentUserResponse>(
        USER_ENDPOINTS.ME
    );
    return response.data;
};

/**
 * Update current user profile
 */
export const updateCurrentUser = async (
    data: UserUpdateRequest
): Promise<UpdateUserResponse> => {
    const response = await httpClient.put<UpdateUserResponse>(
        USER_ENDPOINTS.UPDATE_ME,
        data
    );
    return response.data;
};

/**
 * Delete current user account
 */
export const deleteCurrentUser = async (): Promise<void> => {
    await httpClient.delete(USER_ENDPOINTS.DELETE_ME);
};
