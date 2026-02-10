
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row gap-6 p-6 md:items-start">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {title}
              </CardTitle>
              <Badge variant="outline" className="hidden md:inline-flex text-xs font-normal text-zinc-500">
                featured
              </Badge>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
             {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/50 dark:bg-zinc-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        <div className="flex md:flex-col gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800/50 md:pl-6">
          <Button 
            size="sm"
            className="flex-1 md:w-32 justify-start gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-md hover:shadow-lg transition-all"
            onClick={() => window.open(link, '_blank')}
          >
            <Github className="h-4 w-4" /> Source Code
          </Button>
        </div>
      </div>
    </Card>
  );
}
