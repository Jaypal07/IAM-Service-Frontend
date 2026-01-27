/**
 * Authentication Request Interceptor
 * Single Responsibility: Attach JWT access token to outgoing requests
 */

import type { InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS, TOKEN_CONFIG } from '@/constants';

/**
 * Attach access token to Authorization header
 */
export const authRequestInterceptor = (
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `${TOKEN_CONFIG.HEADER_PREFIX} ${token}`;
    }

    return config;
};

/**
 * Handle request errors
 */
export const authRequestErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};
