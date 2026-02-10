
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillGroupProps {
  category: string;
  items: string[];
  icon: React.ElementType;
}

export function SkillGroup({ category, items, icon: Icon }: SkillGroupProps) {
  return (
    <Card className="bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm h-full hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
      <CardHeader className="flex flex-row items-center gap-2 pb-2 px-4 pt-4">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg text-indigo-600 dark:text-indigo-400">
          <Icon className="h-4 w-4" />
        </div>
        <CardTitle className="text-base font-semibold text-zinc-900 dark:text-white">{category}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <Badge 
              key={item} 
              variant="outline" 
              className="text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 font-normal bg-zinc-50/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-default"
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
