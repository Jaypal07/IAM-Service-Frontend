


interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

export function ExperienceItem({ role, company, period, description, isLast }: ExperienceItemProps) {
  return (
    <div className="relative pl-8 md:pl-10 pb-8 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[13px] top-2 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 group-last:hidden" />
      )}
      
      {/* Dot */}
      <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-white dark:border-zinc-950 bg-indigo-600 shrink-0 z-10 shadow-sm" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{role}</h3>
          <div className="font-medium text-indigo-600 dark:text-indigo-400 text-sm">{company}</div>
        </div>
        <span className="text-xs font-mono text-zinc-500 mt-1 sm:mt-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded inline-block self-start sm:self-auto">
          {period}
        </span>
      </div>
      
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mt-2 max-w-2xl">
        {description}
      </p>
    </div>
  );
}
