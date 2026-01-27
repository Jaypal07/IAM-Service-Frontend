/**
 * User Menu Component
 * Professional dropdown menu for the Navbar
 */

import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usePermissions } from '@/lib/permissions/usePermissions';
import { Avatar } from '@/components/Avatar';
import { 
    LayoutDashboard, 
    User, 
    Settings, 
    LogOut, 
    ChevronDown,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserMenu() {
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const { isAdminOrOwner } = usePermissions();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <Avatar 
                    user={{
                        id: user.id,
                        name: user.name,
                        image: user.image
                    }}
                    size="sm"
                />
                <span className="hidden md:block text-sm font-medium text-zinc-700 dark:text-zinc-200 ml-1">
                    {user.name}
                </span>
                <ChevronDown className={cn(
                    "h-4 w-4 text-zinc-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                            {user.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {user.email}
                        </p>
                    </div>

                    <div className="py-1">
                        <NavLink 
                            to="/dashboard" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                            Dashboard
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/profile" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <User className="h-4 w-4 text-zinc-400" />
                            My Profile
                        </NavLink>

                        {isAdminOrOwner && (
                            <NavLink 
                                to="/admin" 
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <Shield className="h-4 w-4 text-zinc-400" />
                                Admin Panel
                            </NavLink>
                        )}

                        <NavLink 
                            to="/dashboard/settings" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <Settings className="h-4 w-4 text-zinc-400" />
                            Settings
                        </NavLink>
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 py-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
