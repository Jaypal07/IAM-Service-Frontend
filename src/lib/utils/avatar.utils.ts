/**
 * Avatar Utility Functions
 * Generate avatar URLs and manage avatar styles
 */

export type AvatarStyle = 'initials' | 'bottts' | 'avataaars' | 'identicon' | 'pixel-art';

export const AVATAR_STYLES = {
    initials: {
        name: 'Initials',
        description: 'Your initials with gradient background',
        preview: null, // Generated dynamically
    },
    bottts: {
        name: 'Robot',
        description: 'Cute robot avatar',
        preview: 'https://api.dicebear.com/7.x/bottts/svg?seed=preview',
    },
    avataaars: {
        name: 'Cartoon',
        description: 'Illustrated human avatar',
        preview: 'https://api.dicebear.com/7.x/avataaars/svg?seed=preview',
    },
    identicon: {
        name: 'Geometric',
        description: 'Abstract geometric pattern',
        preview: 'https://api.dicebear.com/7.x/identicon/svg?seed=preview',
    },
    'pixel-art': {
        name: 'Pixel Art',
        description: 'Retro pixel art style',
        preview: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=preview',
    },
} as const;

const AVATAR_STORAGE_KEY = 'user-avatar-preferences';

/**
 * Get avatar preference from localStorage for a specific user
 */
export const getAvatarPreference = (userId: string): AvatarStyle | null => {
    try {
        const stored = localStorage.getItem(AVATAR_STORAGE_KEY);
        if (!stored) return null;

        const preferences = JSON.parse(stored);
        return preferences[userId] || null;
    } catch (error) {
        console.error('Failed to read avatar preference:', error);
        return null;
    }
};

/**
 * Save avatar preference to localStorage for a specific user
 */
export const saveAvatarPreference = (userId: string, style: AvatarStyle): void => {
    try {
        const stored = localStorage.getItem(AVATAR_STORAGE_KEY);
        const preferences = stored ? JSON.parse(stored) : {};

        preferences[userId] = style;
        localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
        console.error('Failed to save avatar preference:', error);
    }
};

/**
 * Get avatar URL based on user data and selected style
 */
export const getAvatarUrl = (
    user: { id: string; name: string; image?: string | null },
    style?: AvatarStyle
): string | null => {
    // If user has custom image and it's a full URL, use it
    if (user.image && (user.image.startsWith('http://') || user.image.startsWith('https://'))) {
        return user.image;
    }

    // First, check localStorage for user's preference
    const savedPreference = getAvatarPreference(user.id);
    const avatarStyle = savedPreference || style || 'initials';

    // For initials style, return null (will be handled by component)
    if (avatarStyle === 'initials') {
        return null;
    }

    // Generate DiceBear URL using user ID as seed for consistency
    return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${user.id}`;
};

/**
 * Get user initials from name
 */
export const getInitials = (name: string): string => {
    if (!name) return '?';

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Get gradient background for initials
 */
export const getGradientForUser = (userId: string): string => {
    const gradients = [
        'from-indigo-500 to-purple-600',
        'from-blue-500 to-cyan-600',
        'from-green-500 to-emerald-600',
        'from-orange-500 to-red-600',
        'from-pink-500 to-rose-600',
        'from-violet-500 to-fuchsia-600',
        'from-teal-500 to-green-600',
        'from-amber-500 to-orange-600',
    ];

    // Use user ID to consistently select gradient
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
};

/**
 * Check if avatar style is valid
 */
export const isValidAvatarStyle = (style: string): style is AvatarStyle => {
    return style in AVATAR_STYLES;
};
