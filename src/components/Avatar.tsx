/**
 * Avatar Component
 * Reusable avatar display with fallback to initials
 */

import { useState, useEffect } from 'react';
import { getAvatarUrl, getInitials, getGradientForUser } from '@/lib/utils/avatar.utils';

interface AvatarProps {
    user: {
        id: string;
        name: string;
        image?: string | null;
    };
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    xs: 'h-8 w-8 text-xs',
    sm: 'h-10 w-10 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-xl',
    xl: 'h-20 w-20 text-2xl',
};

export function Avatar({ user, size = 'md', className = '' }: AvatarProps) {
    const [imageError, setImageError] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Listen for avatar updates
    useEffect(() => {
        const handleAvatarUpdate = () => {
            setRefreshKey(prev => prev + 1);
            setImageError(false);
        };

        window.addEventListener('avatar-updated', handleAvatarUpdate);
        return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
    }, []);

    const avatarUrl = getAvatarUrl(user);
    const shouldShowImage = avatarUrl && !imageError;

    if (shouldShowImage) {
        return (
            <img
                key={refreshKey} // Force re-render when avatar changes
                src={avatarUrl}
                alt={`${user.name}'s avatar`}
                className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
                onError={() => setImageError(true)}
                loading="lazy"
            />
        );
    }

    // Fallback to initials
    const initials = getInitials(user.name);
    const gradient = getGradientForUser(user.id);

    return (
        <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold ${className}`}
            aria-label={`${user.name}'s avatar`}
        >
            {initials}
        </div>
    );
}
