/**
 * Shared Stat Card Component
 * Used in Admin and User dashboards for consistent look and feel
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description?: string;
    className?: string;
    trend?: {
        value: string;
        positive: boolean;
    };
}

export function StatCard({ 
    title, 
    value, 
    icon, 
    description, 
    className,
    trend 
}: StatCardProps) {
    return (
        <Card className={cn(
            "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all duration-200",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {title}
                </CardTitle>
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {value}
                </div>
                {(description || trend) && (
                    <div className="flex items-center mt-1">
                        {trend && (
                            <span className={cn(
                                "text-xs font-medium mr-2",
                                trend.positive ? "text-green-600" : "text-red-600"
                            )}>
                                {trend.positive ? '+' : '-'}{trend.value}
                            </span>
                        )}
                        {description && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
