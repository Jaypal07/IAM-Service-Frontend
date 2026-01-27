/**
 * Authentication Hook
 * Single Responsibility: Provide auth state and actions to components
 */

import { useAuthStore } from '../store/auth.store';
import * as authApi from '../api/auth.api';
import type { LoginRequest, RegisterRequest } from '@/types';
import { parseApiError, getErrorMessage } from '@/lib/utils';
import { SUCCESS_MESSAGES } from '@/constants';
import toast from 'react-hot-toast';

/**
 * Main authentication hook
 */
export const useAuth = () => {
    const store = useAuthStore();

    /**
     * Login user
     */
    const login = async (data: LoginRequest) => {
        try {
            console.log('🔐 Starting login...', { email: data.email });
            const response = await authApi.login(data);
            console.log('✅ Login API response:', response);

            store.setAuth(response.accessToken, response.user);
            console.log('✅ Auth store updated');

            // Verify store state
            const currentState = useAuthStore.getState();
            console.log('📊 Current auth state:', {
                isAuthenticated: currentState.isAuthenticated,
                hasToken: !!currentState.accessToken,
                hasUser: !!currentState.user,
                user: currentState.user
            });

            toast.success(SUCCESS_MESSAGES.LOGIN);
            return response;
        } catch (error) {
            console.error('❌ Login failed:', error);
            const message = getErrorMessage(error);
            toast.error(message);
            throw parseApiError(error);
        }
    };

    /**
     * Register user
     */
    const register = async (data: RegisterRequest) => {
        try {
            const response = await authApi.register(data);
            toast.success(SUCCESS_MESSAGES.REGISTER);
            return response;
        } catch (error) {
            const message = getErrorMessage(error);
            toast.error(message);
            throw parseApiError(error);
        }
    };

    /**
     * Logout user
     */
    const logout = async () => {
        try {
            await authApi.logout();
            store.logout();
            toast.success(SUCCESS_MESSAGES.LOGOUT);
        } catch (error) {
            // Logout locally even if API call fails
            store.logout();
            console.warn('Logout API call failed, but cleared local state:', error);
        }
    };

    /**
     * Logout all sessions
     */
    const logoutAll = async () => {
        try {
            await authApi.logoutAll();
            store.logout();
            toast.success('Logged out from all devices');
        } catch (error) {
            const message = getErrorMessage(error);
            toast.error(message);
            throw parseApiError(error);
        }
    };

    return {
        // State
        user: store.user,
        isAuthenticated: store.isAuthenticated,

        // Actions
        login,
        register,
        logout,
        logoutAll,
    };
};
