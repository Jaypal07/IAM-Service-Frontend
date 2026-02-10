
import { cn } from "@/lib/utils";

interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function AboutSection({ className, children, ...props }: AboutSectionProps) {
  return (
    <section 
      className={cn("py-12 md:py-16 px-6 md:px-8 max-w-7xl mx-auto", className)} 
      {...props}
    >
      {children}
    </section>
  );
}
