/**
 * Token Utility Functions
 * Single Responsibility: JWT token operations
 */

import { STORAGE_KEYS, TOKEN_CONFIG } from '@/constants';

/**
 * Decode JWT token payload (without verification)
 * Note: This is for reading claims only, not for security validation
 */
export const decodeToken = (token: string): any => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) {
        return true;
    }

    // Check if token expires within threshold
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
};

/**
 * Get token expiration time
 */
export const getTokenExpiration = (token: string): number | null => {
    const payload = decodeToken(token);
    return payload?.exp || null;
};

/**
 * Get time until token expires (in seconds)
 */
export const getTimeUntilExpiration = (token: string): number | null => {
    const exp = getTokenExpiration(token);
    if (!exp) return null;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp - currentTime;
};

/**
 * Check if token should be refreshed
 */
export const shouldRefreshToken = (token: string): boolean => {
    const timeUntilExp = getTimeUntilExpiration(token);
    if (timeUntilExp === null) return true;

    return timeUntilExp < TOKEN_CONFIG.REFRESH_THRESHOLD;
};

/**
 * Get access token from storage
 */
export const getAccessToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Set access token in storage
 */
export const setAccessToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

/**
 * Remove access token from storage
 */
export const removeAccessToken = (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Get user ID from token
 */
export const getUserIdFromToken = (token: string): string | null => {
    const payload = decodeToken(token);
    return payload?.userId || payload?.sub || null;
};

/**
 * Get user roles from token
 */
export const getRolesFromToken = (token: string): string[] => {
    const payload = decodeToken(token);
    return payload?.roles || payload?.authorities || [];
};
