/**
 * Admin User Management Hook
 * Single Responsibility: Handle admin user operations with state management
 */

import { useState } from 'react';
import toast from 'react-hot-toast';
import * as adminApi from '../api/admin.api';
import type { UserResponse, AdminUserCreateRequest } from '@/types';
import { parseApiError, getErrorMessage } from '@/lib/utils';

export const useAdminUsers = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all users
     */
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminApi.getAllUsers();
            setUsers(data);
            return data;
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
            throw parseApiError(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get user by ID
     */
    const fetchUserById = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const user = await adminApi.getUserById(userId);
            return user;
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
            throw parseApiError(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get user by email
     */
    const fetchUserByEmail = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const user = await adminApi.getUserByEmail(email);
            return user;
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
            throw parseApiError(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create new user
     */
    const createUser = async (data: AdminUserCreateRequest) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await adminApi.createUser(data);
            toast.success('User created successfully');
            return newUser;
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            toast.error(message);
            throw parseApiError(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update user roles
     */
    const updateUserRoles = async (userId: string, currentRoles: string[], newRoles: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await adminApi.updateUserRoles(userId, currentRoles, newRoles);
            // Update user in local state
            setUsers(prev =>
                prev.map(user => user.id === userId ? updatedUser : user)
            );
            toast.success('User roles updated successfully');
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

    /**
     * Disable user
     */
    const disableUser = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await adminApi.disableUser(userId);
            // Update user in local state (set enabled = false)
            setUsers(prev =>
                prev.map(user =>
                    user.id === userId ? { ...user, enabled: false } : user
                )
            );
            toast.success(result.message || 'User disabled successfully');
            return result;
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
        users,
        loading,
        error,
        fetchUsers,
        fetchUserById,
        fetchUserByEmail,
        createUser,
        updateUserRoles,
        disableUser,
    };
};
