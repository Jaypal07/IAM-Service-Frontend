/**
 * Authentication API Types
 * Request and response types matching Spring Boot backend DTOs
 */

/**
 * Login Request
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Register Request
 */
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

/**
 * Role DTO
 */
export interface RoleDto {
    id: string;
    name: string;
}

/**
 * Permission DTO
 */
export interface PermissionDto {
    id: string;
    name: string;
}

/**
 * User Response DTO (matches backend UserResponseDto)
 */
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    enabled: boolean;
    provider: string;
    roles: RoleDto[];
    permissions: PermissionDto[];
    image?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Token Response (matches backend TokenResponse)
 */
export interface TokenResponse {
    accessToken: string;
    expiresIn: number; // TTL in seconds
    user: UserResponse;
}

/**
 * Login Response (alias for TokenResponse)
 */
export type LoginResponse = TokenResponse;

/**
 * Register Response
 */
export interface RegisterResponse {
    message: string;
    status: string;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
    // Empty body - refresh token sent via httpOnly cookie
}

/**
 * Refresh Token Response
 */
export type RefreshTokenResponse = TokenResponse;

/**
 * Password Reset Request
 */
export interface PasswordResetRequest {
    email: string;
}

/**
 * Confirm Password Request
 */
export interface ConfirmPasswordRequest {
    token: string;
    newPassword: string;
}

/**
 * Email Verification Response
 */
export interface EmailVerifyResponse {
    message: string;
    status: string;
}

/**
 * Resend Verification Request
 */
export interface ResendVerificationRequest {
    email: string;
}

/**
 * Token Introspection Response (matches backend)
 */
export interface TokenIntrospectionResponse {
    active: boolean;
    userId?: string;
    email?: string;
    roles?: string[];
    exp?: number;
    iat?: number;
}

/**
 * Logout Response
 */
export interface LogoutResponse {
    message: string;
    status: string;
}
