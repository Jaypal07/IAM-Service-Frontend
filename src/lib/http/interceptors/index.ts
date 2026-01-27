/**
 * HTTP Interceptors Configuration
 * Single Responsibility: Register all interceptors to the HTTP client
 */

import httpClient from '../http-client';
import {
    authRequestInterceptor,
    authRequestErrorInterceptor,
} from './auth.interceptor';
import {
    errorResponseInterceptor,
    errorResponseErrorInterceptor,
} from './error.interceptor';

/**
 * Setup all interceptors
 */
export const setupInterceptors = () => {
    // Request interceptors
    httpClient.interceptors.request.use(
        authRequestInterceptor,
        authRequestErrorInterceptor
    );

    // Response interceptors
    httpClient.interceptors.response.use(
        errorResponseInterceptor,
        errorResponseErrorInterceptor
    );
};

// Auto-setup interceptors on import
setupInterceptors();
