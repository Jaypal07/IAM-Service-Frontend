/**
 * API Endpoint Constants
 * Centralized API routes matching Spring Boot backend structure
 */

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * Authentication Endpoints (/api/v1/auth)
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  LOGOUT_ALL: '/auth/logout-all',
  REFRESH: '/auth/refresh',
  INTROSPECT: '/auth/introspect',

  // Email Verification
  EMAIL_VERIFY: '/auth/email-verify',
  EMAIL_VERIFY_RESEND: '/auth/email-verify/resend',

  // Password Reset
  FORGOT_PASSWORD: '/auth/forgot-password',
  PASSWORD_RESET_CONFIRM: '/auth/password-reset/confirm',
} as const;

/**
 * User Endpoints (/api/v1/users)
 */
export const USER_ENDPOINTS = {
  ME: '/users/me',
  UPDATE_ME: '/users/me',
  DELETE_ME: '/users/me',
} as const;

/**
 * Admin Endpoints (/api/v1/admin)
 */
export const ADMIN_ENDPOINTS = {
  BASE: '/admin',
  BY_EMAIL: '/admin/by-email',

  // Rate Limit Admin
  RATE_LIMIT_RESET_LOGIN_IP: '/admin/rate-limit/reset/login/ip',
  RATE_LIMIT_RESET_LOGIN_EMAIL: '/admin/rate-limit/reset/login/email',
  RATE_LIMIT_RESET_ALL_IP: '/admin/rate-limit/reset/ip/all',
} as const;

/**
 * Health Check
 */
export const HEALTH_ENDPOINTS = {
  HEALTH: '/health',
  ACTUATOR_HEALTH: '/actuator/health',
} as const;

/**
 * OAuth2 Authorization Endpoints
 * These use full URLs to ensure proper port handling
 */
export const OAUTH2_ENDPOINTS = {
  GOOGLE: `${BASE_URL}/oauth2/authorization/google`,
  GITHUB: `${BASE_URL}/oauth2/authorization/github`,
} as const;

