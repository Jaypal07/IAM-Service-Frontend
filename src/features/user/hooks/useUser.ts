/**
 * User Hook
 * Single Responsibility: Manage user profile operations
 */

import { useEffect } from 'react';
import { useUserStore } from '../store/user.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import * as userApi from '../api/user.api';
import type { UserUpdateRequest } from '@/types';
import { parseApiError, getErrorMessage } from '@/lib/utils';
import { SUCCESS_MESSAGES } from '@/constants';
import toast from 'react-hot-toast';

export const useUser = () => {
    const userStore = useUserStore();
    const authStore = useAuthStore();

    /**
     * Fetch current user profile
     */
    const fetchProfile = async () => {
        if (!authStore.isAuthenticated) {
            return;
        }

        userStore.setLoading(true);

        try {
            const profile = await userApi.getCurrentUser();
            userStore.setProfile(profile);
            // Also update auth store user
            authStore.updateUser(profile);
        } catch (error) {
            const apiError = parseApiError(error);
            userStore.setError(apiError);
        } finally {
            userStore.setLoading(false);
        }
    };

    /**
     * Update user profile
     */
    const updateProfile = async (data: UserUpdateRequest) => {
        userStore.setLoading(true);

        try {
            const updatedProfile = await userApi.updateCurrentUser(data);
            userStore.setProfile(updatedProfile);
            authStore.updateUser(updatedProfile);
            toast.success(SUCCESS_MESSAGES.PROFILE_UPDATED);
            return updatedProfile;
        } catch (error) {
            const message = getErrorMessage(error);
            toast.error(message);
            throw parseApiError(error);
        } finally {
            userStore.setLoading(false);
        }
    };

    /**
     * Delete user account
     */
    const deleteAccount = async () => {
        userStore.setLoading(true);

        try {
            await userApi.deleteCurrentUser();
            userStore.clearProfile();
            authStore.logout();
            toast.success('Account deleted successfully');
        } catch (error) {
            const message = getErrorMessage(error);
            toast.error(message);
            throw parseApiError(error);
        } finally {
            userStore.setLoading(false);
        }
    };

    // Auto-fetch profile when authenticated
    useEffect(() => {
        if (authStore.isAuthenticated && !userStore.profile) {
            fetchProfile();
        }
    }, [authStore.isAuthenticated]);

    return {
        profile: userStore.profile || authStore.user,
        loading: userStore.loading,
        error: userStore.error,
        fetchProfile,
        updateProfile,
        deleteAccount,
    };
};
