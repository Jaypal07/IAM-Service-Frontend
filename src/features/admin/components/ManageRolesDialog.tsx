/**
 * Manage Roles Dialog
 * Dialog for managing user roles
 */

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { RoleType, ROLE_NAMES, ROLE_DESCRIPTIONS } from '@/types/roles-permissions.types';
import type { UserResponse } from '@/types';

interface ManageRolesDialogProps {
    user: UserResponse;
    onUserUpdate?: (user: UserResponse) => void;
}

export function ManageRolesDialog({ user, onUserUpdate }: ManageRolesDialogProps) {
    const { updateUserRoles, loading } = useAdminUsers();
    const [open, setOpen] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    // Initialize selected roles when dialog opens
    useEffect(() => {
        if (open) {
            setSelectedRoles(user.roles.map(r => r.name));
        }
    }, [open, user]);

    // Remove ROLE_OWNER from available roles (backend validation restricts it)
    const availableRoles = Object.values(RoleType).filter(role => role !== RoleType.ROLE_OWNER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (selectedRoles.length === 0) {
            return;
        }

        try {
            const currentRoleNames = user.roles.map(r => r.name);
            const updatedUser = await updateUserRoles(user.id, currentRoleNames, selectedRoles);
            if (onUserUpdate) {
                onUserUpdate(updatedUser);
            }
            setOpen(false);
        } catch (error) {
            console.error('Failed to update roles:', error);
        }
    };

    const handleRoleToggle = (role: string, checked: boolean) => {
        setSelectedRoles(prev =>
            checked
                ? [...prev, role]
                : prev.filter(r => r !== role)
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Manage Roles
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Roles - {user.name}</DialogTitle>
                    <DialogDescription>
                        Update role assignments for this user
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-3">
                        <Label>Roles</Label>
                        {availableRoles.map((role) => (
                            <div key={role} className="flex items-start space-x-3 space-y-0">
                                <Checkbox
                                    checked={selectedRoles.includes(role)}
                                    onCheckedChange={(checked) => handleRoleToggle(role, checked as boolean)}
                                    disabled={loading}
                                />
                                <div className="space-y-1 leading-none">
                                    <Label className="font-medium">
                                        {ROLE_NAMES[role]}
                                    </Label>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {ROLE_DESCRIPTIONS[role]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || selectedRoles.length === 0} className="min-w-[100px]">
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Updating...
                                </div>
                            ) : (
                                'Update Roles'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
