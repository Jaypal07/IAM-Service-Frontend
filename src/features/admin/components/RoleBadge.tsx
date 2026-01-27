/**
 * Role Badge Component
 * Visual badge for displaying user roles with distinct colors
 */

import { Badge } from '@/components/ui/badge';
import { RoleType, ROLE_NAMES } from '@/types/roles-permissions.types';

interface RoleBadgeProps {
    role: string;
    className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
    const getRoleColor = (roleName: string): string => {
        switch (roleName) {
            case RoleType.ROLE_OWNER:
                return 'bg-yellow-500 hover:bg-yellow-600 text-white';
            case RoleType.ROLE_ADMIN:
                return 'bg-purple-600 hover:bg-purple-700 text-white';
            case RoleType.ROLE_USER:
                return 'bg-blue-600 hover:bg-blue-700 text-white';
            default:
                return 'bg-gray-600 hover:bg-gray-700 text-white';
        }
    };

    const displayName = ROLE_NAMES[role as RoleType] || role;

    return (
        <Badge className={`${getRoleColor(role)} ${className || ''}`}>
            {displayName}
        </Badge>
    );
};
