/**
 * useUpdateProfile Hook
 * Hook for updating user profile
 */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../api/user.api';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { getErrorMessage, parseApiError } from '@/lib/utils';

interface UpdateProfileData {
    name?: string;
    image?: string;
}

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const updateUser = useAuthStore((state) => state.updateUser);

    const updateProfile = async (data: UpdateProfileData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateCurrentUser(data);
            updateUser(updatedUser);
            toast.success('Profile updated successfully');
            return updatedUser;
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
            throw parseApiError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateProfile,
        loading,
        error,
    };
};
