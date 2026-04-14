import {Card} from "@/components/ui/Card";

type ContactCardProps = {
  label: string;
  value: string;
  href: string;
  actionLabel: string;
};

export function ContactCard({label, value, href, actionLabel}: ContactCardProps) {
  return (
    <Card className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-lg font-medium text-white">{value}</p>
      </div>
      <a className="text-sm font-medium text-sky-300 hover:text-sky-200" href={href}>
        {actionLabel}
      </a>
    </Card>
  );
}
