import { ArrowLeft, ArrowRight, Building2, CalendarDays, Gauge, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { getProjectBySlug, projects } from "@/features/projects/data/projects";
import { Link } from "@/i18n/navigation";

type ProjectDetailsPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.key }));
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const t = await getTranslations("Home.projects");

  return (
    <main className="pb-20 pt-12 sm:pb-28 sm:pt-20">
      <Container>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          href="/#projects"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backCta")}
        </Link>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101522]/95 shadow-[0_28px_90px_rgba(2,6,23,0.28)]">
          <div className="border-b border-white/10 p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                {t(`items.${project.key}.category`)}
              </p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                {t("labels.delivered")}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t(`items.${project.key}.title`)}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {t(`items.${project.key}.summary`)}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <Meta icon={Building2} label={t("labels.client")} value={t(`items.${project.key}.client`)} />
              <Meta icon={CalendarDays} label={t("labels.period")} value={t(`items.${project.key}.period`)} />
              <Meta icon={Users} label={t("labels.team")} value={project.team.join(" + ")} />
            </dl>
          </div>

          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_0.8fr] lg:p-12">
            <div className="space-y-8">
              <DetailBlock
                label={t("labels.problem")}
                text={t(`items.${project.key}.problem`)}
              />
              <DetailBlock
                label={t("labels.built")}
                text={t(`items.${project.key}.built`)}
              />
              <DetailBlock
                label={t("labels.outcome")}
                text={t(`items.${project.key}.outcome`)}
              />
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {t("labels.stack")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span className="rounded-full border border-sky-300/15 bg-sky-300/[0.06] px-3 py-1.5 text-xs text-sky-100" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[0, 1].map((kpiIndex) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5" key={kpiIndex}>
                    <Gauge className="h-4 w-4 text-emerald-300" />
                    <strong className="mt-3 block text-2xl font-semibold text-white">
                      {t(`items.${project.key}.kpis.${kpiIndex}.value`)}
                    </strong>
                    <p className="mt-2 text-[0.65rem] uppercase leading-4 tracking-[0.12em] text-slate-500">
                      {t(`items.${project.key}.kpis.${kpiIndex}.label`)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.05] p-5">
                <p className="text-sm leading-6 text-slate-300">{t("detailCtaText")}</p>
                <Link
                  className={buttonVariants({ className: "mt-5 w-full gap-2", size: "md" })}
                  href="/#contact"
                >
                  {t("cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </main>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
      <div>
        <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
        <dd className="mt-1.5 text-sm text-slate-200">{value}</dd>
      </div>
    </div>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <section>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-300">{label}</p>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{text}</p>
    </section>
  );
}
