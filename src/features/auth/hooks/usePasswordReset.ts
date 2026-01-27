/**
 * Password Reset Hook
 * Single Responsibility: Handle password reset flow
 */

import { useState } from 'react';
import * as authApi from '../api/auth.api';
import type { PasswordResetRequest, ConfirmPasswordRequest } from '@/types';
import { parseApiError, getErrorMessage, sanitizeEmail, isValidEmail, isValidPassword } from '@/lib/utils';
import { SUCCESS_MESSAGES } from '@/constants';
import toast from 'react-hot-toast';

/**
 * Hook for requesting password reset
 */
export const useForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!isValidEmail(email)) {
            setError('Please enter a valid email');
            toast.error('Please enter a valid email');
            return;
        }

        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const data: PasswordResetRequest = {
                email: sanitizeEmail(email),
            };

            await authApi.forgotPassword(data);
            setSuccess(true);
            toast.success(SUCCESS_MESSAGES.PASSWORD_RESET_REQUESTED);
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        loading,
        error,
        success,
        handleSubmit,
    };
};

/**
 * Hook for confirming password reset
 */
export const useResetPassword = (token: string) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const validate = (): boolean => {
        if (!isValidPassword(newPassword)) {
            setError('Password must be at least 8 characters');
            toast.error('Password must be at least 8 characters');
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const data: ConfirmPasswordRequest = {
                token,
                newPassword,
            };

            await authApi.resetPassword(data);
            setSuccess(true);
            toast.success(SUCCESS_MESSAGES.PASSWORD_RESET);
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        error,
        success,
        handleSubmit,
    };
};
