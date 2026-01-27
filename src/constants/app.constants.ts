/**
 * Application Constants
 * Centralized application-wide constants
 */

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    AUTH_STATE: 'app_state',
    USER_PREFERENCES: 'user_preferences',
} as const;

/**
 * HTTP Configuration
 */
export const HTTP_CONFIG = {
    TIMEOUT: 10000, // 10 seconds
    WITH_CREDENTIALS: true,
} as const;

/**
 * Token Configuration
 */
export const TOKEN_CONFIG = {
    HEADER_PREFIX: 'Bearer',
    REFRESH_THRESHOLD: 60, // Refresh if token expires in less than 60 seconds
} as const;

/**
 * App Routes
 */
export const APP_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    PROFILE: '/dashboard/profile',
    ADMIN: '/admin',

    // Auth flows
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    // OAuth
    OAUTH_SUCCESS: '/oauth/success',
    OAUTH_FAILURE: '/oauth/failure',
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Unable to connect to server. Please try again later.',
    UNAUTHORIZED: 'Your session has expired. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    SERVER_ERROR: 'Something went wrong. Please try again.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    RATE_LIMIT: 'Too many requests. Please try again later.',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
    LOGIN: 'Login successful!',
    LOGOUT: 'Logout successful!',
    REGISTER: 'Registration successful! Please verify your email.',
    EMAIL_VERIFIED: 'Email verified successfully!',
    PASSWORD_RESET_REQUESTED: 'If the email exists, a password reset link has been sent.',
    PASSWORD_RESET: 'Password reset successful!',
    PROFILE_UPDATED: 'Profile updated successfully!',
} as const;

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
} as const;
