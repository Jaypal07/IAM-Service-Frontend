/**
 * User API Types
 * Types for user management endpoints
 */

import type { UserResponse } from './auth.types';

/**
 * User Update Request
 */
export interface UserUpdateRequest {
    name?: string;
    email?: string;
    image?: string;
}

/**
 * Get Current User Response
 */
export type GetCurrentUserResponse = UserResponse;

/**
 * Update User Response
 */
export type UpdateUserResponse = UserResponse;
