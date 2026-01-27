/**
 * Validation Utility Functions
 * Single Responsibility: Input validation helpers
 */

import { VALIDATION_RULES } from '@/constants';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

/**
 * Validate name
 */
export const isValidName = (name: string): boolean => {
    const trimmed = name.trim();
    return (
        trimmed.length >= VALIDATION_RULES.NAME_MIN_LENGTH &&
        trimmed.length <= VALIDATION_RULES.NAME_MAX_LENGTH
    );
};

/**
 * Get password strength (0-4)
 */
export const getPasswordStrength = (password: string): number => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return Math.min(strength, 4);
};

/**
 * Get password strength label
 */
export const getPasswordStrengthLabel = (password: string): string => {
    const strength = getPasswordStrength(password);
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[strength] || 'Very Weak';
};

/**
 * Sanitize input (trim and lowercase for email)
 */
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

/**
 * Sanitize name (trim)
 */
export const sanitizeName = (name: string): string => {
    return name.trim();
};
