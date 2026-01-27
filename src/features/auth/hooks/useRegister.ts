/**
 * Register Hook
 * Single Responsibility: Handle registration form state and submission
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RegisterRequest } from '@/types';
import { useAuth } from './useAuth';
import { APP_ROUTES } from '@/constants';
import { sanitizeEmail, sanitizeName, isValidEmail, isValidPassword, isValidName } from '@/lib/utils';
import toast from 'react-hot-toast';

export const useRegister = () => {
    const navigate = useNavigate();
    const { register: performRegister } = useAuth();

    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Handle input change
     */
    const handleChange = (field: keyof RegisterRequest, value: string) => {
        setError(null);
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    /**
     * Validate form
     */
    const validate = (): boolean => {
        if (!isValidName(formData.name)) {
            setError('Please enter a valid name');
            toast.error('Please enter a valid name');
            return false;
        }

        if (!isValidEmail(formData.email)) {
            setError('Please enter a valid email');
            toast.error('Please enter a valid email');
            return false;
        }

        if (!isValidPassword(formData.password)) {
            setError('Password must be at least 8 characters');
            toast.error('Password must be at least 8 characters');
            return false;
        }

        return true;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        setError(null);
        setLoading(true);

        try {
            // Sanitize inputs
            const data: RegisterRequest = {
                name: sanitizeName(formData.name),
                email: sanitizeEmail(formData.email),
                password: formData.password,
            };

            await performRegister(data);

            // Clear form
            setFormData({ name: '', email: '', password: '' });

            // Redirect to login
            navigate(APP_ROUTES.LOGIN);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
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
