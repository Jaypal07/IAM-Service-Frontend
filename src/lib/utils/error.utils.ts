/**
 * Error Utility Functions
 * Single Responsibility: Parse and format API errors
 */

import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

/**
 * Parse Axios error into a user-friendly ApiError
 */
export const parseApiError = (error: unknown): ApiError => {
    // If it's already an ApiError, return it
    if (isApiError(error)) {
        return error;
    }

    // If it's an Axios error
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        // Server responded with error
        if (axiosError.response) {
            return {
                message: axiosError.response.data?.message || ERROR_MESSAGES.SERVER_ERROR,
                status: axiosError.response.status,
                statusText: axiosError.response.statusText,
                timestamp: axiosError.response.data?.timestamp,
                path: axiosError.response.data?.path,
                errors: axiosError.response.data?.errors,
            };
        }

        // Request made but no response (network error)
        if (axiosError.request) {
            return {
                message: ERROR_MESSAGES.NETWORK_ERROR,
                status: 0,
                statusText: 'Network Error',
            };
        }
    }

    // Unknown error
    return {
        message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    };
};

/**
 * Get error message from unknown error type
 */
export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Try to extract message from response data
        const responseData = error.response?.data;

        // Check for message in response (common backend format)
        if (responseData?.message) {
            return responseData.message;
        }

        // Check for title field (RFC 7807 Problem Details format)
        if (responseData?.title) {
            return responseData.title;
        }

        // Check for detail field (RFC 7807 Problem Details format)
        if (responseData?.detail) {
            return responseData.detail;
        }

        // Check for error field
        if (responseData?.error) {
            return typeof responseData.error === 'string'
                ? responseData.error
                : responseData.error.message || 'An error occurred';
        }

        // Fallback to status text or default message
        return error.response?.statusText || error.message || 'An error occurred';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

/**
 * Type guard for ApiError
 */
export const isApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as ApiError).message === 'string'
    );
};

/**
 * Type guard for Axios error
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as any).isAxiosError === true
    );
};

/**
 * Get HTTP status from error
 */
export const getErrorStatus = (error: unknown): number | undefined => {
    const apiError = parseApiError(error);
    return apiError.status;
};

/**
 * Check if error is a specific HTTP status
 */
export const isErrorStatus = (error: unknown, status: number): boolean => {
    return getErrorStatus(error) === status;
};

/**
 * Check if error is unauthorized (401)
 */
export const isUnauthorizedError = (error: unknown): boolean => {
    return isErrorStatus(error, 401);
};

/**
 * Check if error is forbidden (403)
 */
export const isForbiddenError = (error: unknown): boolean => {
    return isErrorStatus(error, 403);
};

/**
 * Check if error is not found (404)
 */
export const isNotFoundError = (error: unknown): boolean => {
    return isErrorStatus(error, 404);
};

/**
 * Check if error is rate limit (429)
 */
export const isRateLimitError = (error: unknown): boolean => {
    return isErrorStatus(error, 429);
};
