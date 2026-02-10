
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </CardTitle>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        <CardDescription className="text-sm pt-1 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white dark:bg-zinc-800 font-normal hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
        <Button 
          variant="ghost" 
          className="w-full text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 group/btn"
          onClick={() => window.open(link, '_blank')}
        >
          View Project <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
