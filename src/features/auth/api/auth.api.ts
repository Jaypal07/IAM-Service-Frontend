/**
 * Authentication API Service
 * Single Responsibility: All authentication-related API calls
 */

import { httpClient, refreshClient } from '@/lib/http';
import { AUTH_ENDPOINTS } from '@/constants';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenResponse,
    PasswordResetRequest,
    ConfirmPasswordRequest,
    EmailVerifyResponse,
    LogoutResponse,
    TokenIntrospectionResponse,
} from '@/types';

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        data
    );
    return response.data;
};

/**
 * Register new user
 */
export const register = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await httpClient.post<RegisterResponse>(
        AUTH_ENDPOINTS.REGISTER,
        data
    );
    return response.data;
};

/**
 * Logout current session
 */
export const logout = async (): Promise<LogoutResponse> => {
    const response = await httpClient.post<LogoutResponse>(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
};

/**
 * Logout all sessions
 */
export const logoutAll = async (): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.LOGOUT_ALL);
};

/**
 * Refresh access token
 * Note: Uses refreshClient to avoid circular interceptor calls
 */
export const refresh = async (): Promise<RefreshTokenResponse> => {
    const response = await refreshClient.post<RefreshTokenResponse>(
        AUTH_ENDPOINTS.REFRESH
    );
    return response.data;
};

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<EmailVerifyResponse> => {
    const response = await httpClient.get<EmailVerifyResponse>(
        AUTH_ENDPOINTS.EMAIL_VERIFY,
        {
            params: { token },
        }
    );
    return response.data;
};

/**
 * Resend email verification
 */
export const resendVerification = async (
    email: string
): Promise<EmailVerifyResponse> => {
    const response = await httpClient.post<EmailVerifyResponse>(
        AUTH_ENDPOINTS.EMAIL_VERIFY_RESEND,
        null,
        {
            params: { email },
        }
    );
    return response.data;
};

/**
 * Request password reset
 */
export const forgotPassword = async (
    data: PasswordResetRequest
): Promise<EmailVerifyResponse> => {
    const response = await httpClient.post<EmailVerifyResponse>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        data
    );
    return response.data;
};

/**
 * Confirm password reset
 */
export const resetPassword = async (
    data: ConfirmPasswordRequest
): Promise<EmailVerifyResponse> => {
    const response = await httpClient.post<EmailVerifyResponse>(
        AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM,
        data
    );
    return response.data;
};

/**
 * Introspect token validity
 */
export const introspectToken = async (): Promise<TokenIntrospectionResponse> => {
    const response = await httpClient.post<TokenIntrospectionResponse>(
        AUTH_ENDPOINTS.INTROSPECT
    );
    return response.data;
};
