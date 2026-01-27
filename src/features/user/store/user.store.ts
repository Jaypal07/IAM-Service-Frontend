/**
 * User State Store
 * Single Responsibility: Manage user profile state
 */

import { create } from 'zustand';
import type { UserResponse, ApiError } from '@/types';

/**
 * User State Interface
 */
interface UserState {
    // State
    profile: UserResponse | null;
    loading: boolean;
    error: ApiError | null;

    // Actions
    setProfile: (profile: UserResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: ApiError | null) => void;
    clearProfile: () => void;
}

/**
 * User Store
 */
export const useUserStore = create<UserState>()((set) => ({
    // Initial state
    profile: null,
    loading: false,
    error: null,

    // Set profile data
    setProfile: (profile) => {
        set({ profile, error: null });
    },

    // Set loading state
    setLoading: (loading) => {
        set({ loading });
    },

    // Set error
    setError: (error) => {
        set({ error, loading: false });
    },

    // Clear profile
    clearProfile: () => {
        set({ profile: null, error: null, loading: false });
    },
}));
