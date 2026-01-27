/**
 * Login Hook
 * Single Responsibility: Handle login form state and submission
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { LoginRequest } from '@/types';
import { useAuth } from './useAuth';
import { APP_ROUTES } from '@/constants';
import { sanitizeEmail } from '@/lib/utils';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login: performLogin } = useAuth();

    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Handle input change
     */
    const handleChange = (field: keyof LoginRequest, value: string) => {
        setError(null);
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            // Sanitize email
            const data: LoginRequest = {
                email: sanitizeEmail(formData.email),
                password: formData.password,
            };

            await performLogin(data);
            navigate(APP_ROUTES.DASHBOARD);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
