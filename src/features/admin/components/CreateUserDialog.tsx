/**
 * Create User Dialog
 * Modal for creating new users with role assignment
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus } from 'lucide-react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { RoleType, ROLE_NAMES, ROLE_DESCRIPTIONS } from '@/types/roles-permissions.types';
import type { AdminUserCreateRequest } from '@/types';

interface CreateUserDialogProps {
    onSuccess?: () => void;
}

export function CreateUserDialog({ onSuccess }: CreateUserDialogProps = {}) {
    const { createUser, loading } = useAdminUsers();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<AdminUserCreateRequest>({
        name: '',
        email: '',
        password: '',
        roles: [RoleType.ROLE_USER], // Default to USER role
    });

    // Remove ROLE_OWNER from available roles (backend validation restricts it)
    const availableRoles = Object.values(RoleType).filter(role => role !== RoleType.ROLE_OWNER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password) {
            return;
        }

        try {
            await createUser(formData);
            setOpen(false);
            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                roles: [RoleType.ROLE_USER],
            });
            // Notify parent to refresh its list
            onSuccess?.();
        } catch (error) {
            console.error('Failed to create user:', error);
            // Error toast is already shown by useAdminUsers hook
        }
    };

    const handleRoleToggle = (role: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            roles: checked
                ? [...prev.roles, role]
                : prev.roles.filter(r => r !== role)
        }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-500">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Add a new user to the system with specified roles
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Roles</Label>
                        {availableRoles.map((role) => (
                            <div key={role} className="flex items-start space-x-3 space-y-0">
                                <Checkbox
                                    checked={formData.roles.includes(role)}
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
                        <Button type="submit" disabled={loading} className="min-w-[100px]">
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </div>
                            ) : (
                                'Create User'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
