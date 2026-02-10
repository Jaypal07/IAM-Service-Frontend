


interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

export function ExperienceItem({ role, company, period, description, isLast }: ExperienceItemProps) {
  return (
    <div className="relative grid md:grid-cols-[200px_1fr] gap-8 pb-12 group">
      {/* Timeline Line (Desktop: Center/Left, Mobile: Left) */}
      {!isLast && (
        <div className="absolute left-[9px] md:left-[208px] top-2 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 border-dashed border-l border-zinc-200 dark:border-zinc-800 group-last:hidden" />
      )}

      {/* Date Column */}
      <div className="pl-8 md:pl-0 md:text-right md:pr-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
           {period}
        </span>
      </div>

      {/* Content Column */}
      <div className="relative pl-8 md:pl-8">
         {/* Dot */}
        <div className="absolute left-0 md:-left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-950 bg-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-900/20 z-10" />
        
        <div className="space-y-2">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{role}</h3>
            <div className="font-medium text-lg text-indigo-600 dark:text-indigo-400">{company}</div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl bg-white/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
