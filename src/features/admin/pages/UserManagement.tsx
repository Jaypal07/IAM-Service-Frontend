import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { 
    Search, 
    Eye, 
    UserX, 
    ArrowLeft,
    RefreshCw,
    X
} from 'lucide-react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { RoleBadge } from '../components/RoleBadge';
import { CreateUserDialog } from '../components/CreateUserDialog';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { Avatar } from '@/components/Avatar';
import { APP_ROUTES } from '@/constants';
import type { UserResponse } from '@/types';

function UserManagement() {
    const navigate = useNavigate();
    const { users, loading, fetchUsers, disableUser } = useAdminUsers();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [users, searchTerm]);

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(APP_ROUTES.ADMIN)}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                                User Management
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                View and manage all user accounts
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => fetchUsers()}
                                disabled={loading}
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            <CreateUserDialog onSuccess={fetchUsers} />
                        </div>
                    </div>
                </div>

                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>All Users</CardTitle>
                                <CardDescription>
                                    Total: {filteredUsers.length} {filteredUsers.length !== users.length && `(filtered from ${users.length})`}
                                </CardDescription>
                            </div>
                            <div className="w-80">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                    <Input
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-10"
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading && users.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading users...</p>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roles</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Provider</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar 
                                                        user={{
                                                            id: user.id,
                                                            name: user.name,
                                                            image: user.image
                                                        }}
                                                        size="sm"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-zinc-900 dark:text-white">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-zinc-500">
                                                            ID: {user.id.substring(0, 8)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-zinc-600 dark:text-zinc-400">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {user.roles.map((role) => (
                                                        <RoleBadge key={role.id} role={role.name} />
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.enabled ? 'default' : 'secondary'}
                                                    className={user.enabled ? 'bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-200 dark:border-green-900' : 'bg-red-600/10 text-red-700 hover:bg-red-600/20 border-red-200 dark:border-red-900'}
                                                >
                                                    {user.enabled ? (
                                                        <div className="flex items-center">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2" />
                                                            Active
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2" />
                                                            Disabled
                                                        </div>
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {user.provider.toLowerCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`${APP_ROUTES.ADMIN}/users/${user.id}`}>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {user.enabled && (
                                                        <ConfirmationDialog
                                                            title="Disable User Account"
                                                            description={`Are you sure you want to disable ${user.name}'s account? They will no longer be able to log in.`}
                                                            variant="destructive"
                                                            onConfirm={async () => {
                                                                await disableUser(user.id);
                                                            }}
                                                            confirmText="Disable Account"
                                                            trigger={
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                                >
                                                                    <UserX className="h-4 w-4" />
                                                                </Button>
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default UserManagement;
