/**
 * Admin Dashboard
 * Overview page for administrators showing statistics and quick actions
 */

import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { RoleType } from '@/types/roles-permissions.types';
import { Link } from 'react-router';
import { APP_ROUTES } from '@/constants';
import type { UserResponse } from '@/types';

function AdminDashboard() {
    const { users, loading, fetchUsers } = useAdminUsers();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        disabled: 0,
        admins: 0,
        owners: 0
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            setStats({
                total: users.length,
                active: users.filter((u: UserResponse) => u.enabled).length,
                disabled: users.filter((u: UserResponse) => !u.enabled).length,
                admins: users.filter((u: UserResponse) => 
                    u.roles.some((r: any) => r.name === RoleType.ROLE_ADMIN)
                ).length,
                owners: users.filter((u: UserResponse) => 
                    u.roles.some((r: any) => r.name === RoleType.ROLE_OWNER)
                ).length
            });
        }
    }, [users]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Manage users, roles, and system settings
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard
                        title="Total Users"
                        value={loading ? '...' : stats.total.toString()}
                        icon={<Users className="h-5 w-5 text-indigo-600" />}
                        description="All registered users"
                    />
                    <StatCard
                        title="Active Users"
                        value={loading ? '...' : stats.active.toString()}
                        icon={<UserCheck className="h-5 w-5 text-green-600" />}
                        description="Enabled accounts"
                    />
                    <StatCard
                        title="Disabled Users"
                        value={loading ? '...' : stats.disabled.toString()}
                        icon={<UserX className="h-5 w-5 text-red-600" />}
                        description="Disabled accounts"
                    />
                    <StatCard
                        title="Administrators"
                        value={loading ? '...' : stats.admins.toString()}
                        icon={<Shield className="h-5 w-5 text-purple-600" />}
                        description={`${stats.admins} Admin + ${stats.owners} Owner`}
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <QuickActionCard
                        title="User Management"
                        description="View and manage all users"
                        href={`${APP_ROUTES.ADMIN}/users`}
                        icon={<Users className="h-6 w-6" />}
                    />
                    <QuickActionCard
                        title="System Settings"
                        description="Configure system preferences"
                        href={`${APP_ROUTES.ADMIN}/settings`}
                        icon={<Shield className="h-6 w-6" />}
                        comingSoon
                    />
                    <QuickActionCard
                        title="Audit Logs"
                        description="View system audit history"
                        href={`${APP_ROUTES.ADMIN}/audit`}
                        icon={<Shield className="h-6 w-6" />}
                        comingSoon
                    />
                </div>
            </div>
        </div>
    );
}

interface QuickActionCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.JSX.Element;
    comingSoon?: boolean;
}

function QuickActionCard({ title, description, href, icon, comingSoon }: QuickActionCardProps) {
    const content = (
        <Card className={`bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all h-full ${
            comingSoon 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer'
        }`}>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-lg">
                            {title}
                            {comingSoon && <span className="ml-2 text-xs text-zinc-500">(Coming Soon)</span>}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );

    if (comingSoon) {
        return <div>{content}</div>;
    }

    return <Link to={href}>{content}</Link>;
}

export default AdminDashboard;
