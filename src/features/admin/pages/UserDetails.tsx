/**
 * User Details Page
 * Detailed view of a single user with role management
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Calendar, Shield, UserCircle } from 'lucide-react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { RoleBadge } from '../components/RoleBadge';
import { ManageRolesDialog } from '../components/ManageRolesDialog';
import { Avatar } from '@/components/Avatar';
import { APP_ROUTES } from '@/constants';
import type { UserResponse } from '@/types';

function UserDetails() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const { fetchUserById, loading } = useAdminUsers();
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        if (userId) {
            fetchUserById(userId).then(setUser).catch(console.error);
        }
    }, [userId]);

    const handleUserUpdate = (updatedUser: UserResponse) => {
        setUser(updatedUser);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading user...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
                <div className="text-center">
                    <p className="text-zinc-600 dark:text-zinc-400">User not found</p>
                    <Button onClick={() => navigate(`${APP_ROUTES.ADMIN}/users`)} className="mt-4">
                        Back to Users
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`${APP_ROUTES.ADMIN}/users`)}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Users
                    </Button>
                </div>

                {/* User Profile Card */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 mb-6">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar 
                                user={{
                                    id: user.id,
                                    name: user.name,
                                    image: user.image
                                }}
                                size="xl"
                            />
                            <div className="flex-1">
                                <CardTitle className="text-2xl">{user.name}</CardTitle>
                                <CardDescription className="text-base mt-1">{user.email}</CardDescription>
                                <div className="mt-3">
                                    <Badge
                                        variant={user.enabled ? 'default' : 'secondary'}
                                        className={user.enabled ? 'bg-green-600 hover:bg-green-700' : ''}
                                    >
                                        {user.enabled ? 'Active' : 'Disabled'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <InfoItem
                                key="email"
                                icon={<Mail className="h-5 w-5" />}
                                label="Email"
                                value={user.email}
                            />
                            <InfoItem
                                key="userId"
                                icon={<UserCircle className="h-5 w-5" />}
                                label="User ID"
                                value={user.id}
                            />
                            <InfoItem
                                key="provider"
                                icon={<Shield className="h-5 w-5" />}
                                label="Provider"
                                value={user.provider}
                            />
                            <InfoItem
                                key="created"
                                icon={<Calendar className="h-5 w-5" />}
                                label="Created"
                                value={new Date(user.createdAt).toLocaleDateString()}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Roles Card */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Roles</CardTitle>
                                <CardDescription>User role assignments</CardDescription>
                            </div>
                            <ManageRolesDialog user={user} onUserUpdate={handleUserUpdate} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 flex-wrap">
                            {user.roles.map((role) => (
                                <RoleBadge key={role.id} role={role.name} className="text-sm px-3 py-1" />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Permissions Card */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <CardDescription>
                            {user.permissions.length} permission{user.permissions.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                            {user.permissions.map((permission) => (
                                <Badge key={permission.id} variant="outline" className="justify-center">
                                    {permission.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

interface InfoItemProps {
    icon: React.JSX.Element;
    label: string;
    value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
                <div className="font-medium text-zinc-900 dark:text-white truncate">
                    {value}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
