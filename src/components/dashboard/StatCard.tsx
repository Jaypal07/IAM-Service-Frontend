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
            "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-sm transition-all duration-200",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 p-4">
                <CardTitle className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                    {/* Clone element to force size prop if passed, or wrapper */}
                    <div className="h-4 w-4 text-zinc-500 dark:text-zinc-400">
                        {icon}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-xl font-bold text-zinc-900 dark:text-white">
                    {value}
                </div>
                {(description || trend) && (
                    <div className="flex items-center mt-1">
                        {trend && (
                            <span className={cn(
                                "text-[10px] font-medium mr-2",
                                trend.positive ? "text-emerald-600" : "text-rose-600"
                            )}>
                                {trend.positive ? '+' : '-'}{trend.value}
                            </span>
                        )}
                        {description && (
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
