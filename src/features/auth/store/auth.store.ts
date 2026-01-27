/**
 * Authentication State Store
 * Single Responsibility: Manage authentication state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserResponse } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { setAccessToken, removeAccessToken, getAccessToken } from '@/lib/utils';

/**
 * Auth State Interface
 */
interface AuthState {
    // State
    accessToken: string | null;
    user: UserResponse | null;
    isAuthenticated: boolean;

    // Actions
    setAuth: (token: string, user: UserResponse) => void;
    updateUser: (user: UserResponse) => void;
    logout: () => void;
    clearAuth: () => void;
    hydrate: () => void;
}

/**
 * Auth Store
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state
            accessToken: null,
            user: null,
            isAuthenticated: false,

            // Set authentication data
            setAuth: (token, user) => {
                setAccessToken(token);
                set({
                    accessToken: token,
                    user,
                    isAuthenticated: true,
                });
            },

            // Update user data
            updateUser: (user) => {
                set({ user });
            },

            // Logout (clear state)
            logout: () => {
                removeAccessToken();
                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },

            // Clear all auth data
            clearAuth: () => {
                removeAccessToken();
                localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },

            // Hydrate auth state from localStorage on app init
            hydrate: () => {
                const token = getAccessToken();
                if (token) {
                    // Token exists in localStorage, update the store
                    set((state) => ({
                        accessToken: token,
                        // Keep user and isAuthenticated from persisted state
                        isAuthenticated: state.isAuthenticated || !!token,
                    }));
                }
            },
        }),
        {
            name: STORAGE_KEYS.AUTH_STATE,
            partialize: (state) => ({
                // Persist user and isAuthenticated
                // accessToken is stored separately in localStorage via setAccessToken
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
