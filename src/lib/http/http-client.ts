/**
 * Base HTTP Client
 * Single Responsibility: Configure axios instance with base settings
 */

import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL, HTTP_CONFIG } from '@/constants';

/**
 * Main API Client Instance
 */
const httpClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: HTTP_CONFIG.TIMEOUT,
    withCredentials: HTTP_CONFIG.WITH_CREDENTIALS,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Separate Refresh Client
 * Used ONLY for token refresh to avoid circular interceptor calls
 */
export const refreshClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: HTTP_CONFIG.TIMEOUT,
    withCredentials: HTTP_CONFIG.WITH_CREDENTIALS,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default httpClient;
