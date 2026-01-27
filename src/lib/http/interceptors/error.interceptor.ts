/**
 * Error Response Interceptor
 * Single Responsibility: Handle API errors and automatic token refresh
 */

import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshClient } from '../http-client';
import { AUTH_ENDPOINTS, STORAGE_KEYS, TOKEN_CONFIG } from '@/constants';
import type { TokenResponse } from '@/types';

/**
 * Track refresh state to prevent multiple simultaneous refresh attempts
 */
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string | null) => void;
    reject: (error: any) => void;
}> = [];

/**
 * Process queued requests after refresh completes
 */
const processQueue = (error: any = null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

/**
 * Response success handler
 */
export const errorResponseInterceptor = (response: any) => {
    return response;
};

/**
 * Response error handler with automatic token refresh
 */
export const errorResponseErrorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
    };

    // If no response or config, reject immediately
    if (!error.response || !originalRequest) {
        return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const hasNotRetried = !originalRequest._retry;

    // If not 401 or already retried, reject
    if (!isUnauthorized || !hasNotRetried) {
        return Promise.reject(error);
    }

    // Mark request as retried
    originalRequest._retry = true;

    /**
     * If already refreshing, queue this request
     */
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({
                resolve: (token: string | null) => {
                    if (!token) {
                        reject(error);
                        return;
                    }
                    originalRequest.headers.Authorization = `${TOKEN_CONFIG.HEADER_PREFIX} ${token}`;
                    resolve(httpClient(originalRequest));
                },
                reject: (err: any) => {
                    reject(err);
                },
            });
        });
    }

    /**
     * Start refresh process
     */
    isRefreshing = true;

    try {
        console.log('🔄 Refreshing access token...');

        // Use separate refresh client to avoid circular interceptor calls
        const response = await refreshClient.post<TokenResponse>(AUTH_ENDPOINTS.REFRESH);
        const { accessToken, user } = response.data;

        if (!accessToken) {
            throw new Error('No access token in refresh response');
        }

        // Store new token
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

        // Update auth store if available
        try {
            const { useAuthStore } = await import('@/features/auth/store/auth.store');
            useAuthStore.getState().setAuth(accessToken, user);
        } catch (e) {
            console.warn('Could not update auth store:', e);
        }

        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `${TOKEN_CONFIG.HEADER_PREFIX} ${accessToken}`;

        // Import httpClient dynamically to avoid circular dependency
        const { default: httpClient } = await import('../http-client');
        return httpClient(originalRequest);
    } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);

        // Clear auth state
        processQueue(refreshError, null);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);

        // Logout user
        try {
            const { useAuthStore } = await import('@/features/auth/store/auth.store');
            useAuthStore.getState().logout();
        } catch (e) {
            console.warn('Could not logout from store:', e);
        }

        return Promise.reject(refreshError);
    } finally {
        isRefreshing = false;
    }
};

// Import httpClient here to avoid issues during initialization
import httpClient from '../http-client';
