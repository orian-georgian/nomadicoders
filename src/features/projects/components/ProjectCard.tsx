import {Card} from "@/components/ui/Card";

type ProjectCardProps = {
  category: string;
  title: string;
  summary: string;
  outcome: string;
};

export function ProjectCard({category, title, summary, outcome}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
        {category}
      </span>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm leading-7 text-slate-300">{summary}</p>
      </div>
      <p className="mt-auto text-sm font-medium text-violet-300">{outcome}</p>
    </Card>
  );
}
