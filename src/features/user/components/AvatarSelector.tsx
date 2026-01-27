/**
 * Avatar Selector Component
 * Dialog for users to select their avatar style (saves to localStorage)
 */

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Check } from 'lucide-react';
import { 
    AVATAR_STYLES, 
    type AvatarStyle, 
    getInitials, 
    getGradientForUser,
    getAvatarPreference,
    saveAvatarPreference
} from '@/lib/utils/avatar.utils';
import { useAuthStore } from '@/features/auth/store/auth.store';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import React from 'react';

interface AvatarSelectorProps {
    children?: React.ReactNode;
}

export function AvatarSelector({ children }: AvatarSelectorProps) {
    const user = useAuthStore((state) => state.user);
    const [open, setOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('initials');
    const [saving, setSaving] = useState(false);
    // Force re-render trigger
    const [, setRefreshKey] = useState(0);

    if (!user) return null;

    // Get current style from localStorage
    const currentStyle = getAvatarPreference(user.id) || 'initials';

    // Initialize selected style when dialog opens
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            setSelectedStyle(currentStyle);
        }
    };

    const handleSave = () => {
        try {
            setSaving(true);
            // Save to localStorage
            saveAvatarPreference(user.id, selectedStyle);
            // Trigger re-render across app by updating the refresh key
            setRefreshKey(prev => prev + 1);
            // Force a state update event
            window.dispatchEvent(new Event('avatar-updated'));
            toast.success('Avatar updated successfully');
            setOpen(false);
        } catch (error) {
            console.error('Failed to update avatar:', error);
            toast.error('Failed to update avatar');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <Camera className="h-4 w-4" />
                        Change Avatar
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Choose Your Avatar Style</DialogTitle>
                    <DialogDescription>
                        Select an avatar style (saved locally on this device)
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {(Object.entries(AVATAR_STYLES) as [AvatarStyle, typeof AVATAR_STYLES[AvatarStyle]][]).map(
                        ([style, info]) => {
                            const isSelected = selectedStyle === style;
                            const isCurrent = currentStyle === style;

                            return (
                                <button
                                    key={style}
                                    onClick={() => setSelectedStyle(style)}
                                    className={cn(
                                        "relative p-4 rounded-xl border-2 transition-all duration-200 text-left flex flex-col items-center",
                                        isSelected 
                                            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm"
                                            : isCurrent
                                                ? "border-zinc-300 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-800"
                                                : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    {/* Preview */}
                                    <div className={cn(
                                        "h-20 w-20 rounded-full mb-3 flex items-center justify-center transition-transform duration-200 shadow-sm",
                                        isSelected && "scale-110"
                                    )}>
                                        {style === 'initials' ? (
                                            <div
                                                className={`h-full w-full rounded-full bg-gradient-to-br ${getGradientForUser(
                                                    user.id
                                                )} flex items-center justify-center text-white font-semibold text-2xl`}
                                            >
                                                {getInitials(user.name)}
                                            </div>
                                        ) : (
                                            <img
                                                src={`https://api.dicebear.com/7.x/${style}/svg?seed=${user.id}`}
                                                alt={info.name}
                                                className="h-full w-full rounded-full"
                                            />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="text-center">
                                        <div className="font-semibold text-sm text-zinc-900 dark:text-white">
                                            {info.name}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                                            {info.description}
                                        </div>
                                    </div>

                                    {/* Selected indicator */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center animate-in zoom-in scale-110">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}

                                    {/* Current indicator */}
                                    {isCurrent && !isSelected && (
                                        <div className="absolute bottom-2 right-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                        </div>
                                    )}
                                </button>
                            );
                        }
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving || selectedStyle === currentStyle}>
                        {saving ? 'Saving...' : 'Save Avatar'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
