/**
 * Common Type Definitions
 * Shared types used across the application
 */

/**
 * Standard API Error Response
 */
export interface ApiError {
    message: string;
    status?: number;
    statusText?: string;
    timestamp?: string;
    path?: string;
    errors?: Record<string, string[]>;
}

/**
 * Generic API Response Wrapper
 */
export interface ApiResponse<T = any> {
    message: string;
    status: string;
    data?: T;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
}

/**
 * Loading States
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic Async State
 */
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
}
