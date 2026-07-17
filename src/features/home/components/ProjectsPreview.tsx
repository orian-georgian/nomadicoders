"use client";

import { ArrowUpRight, Gauge, Layers3, Route, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";

import { ClientLogos } from "./ClientLogos";

type ProjectKey = "saas" | "booking" | "marketing";

type Project = {
  icon: LucideIcon;
  key: ProjectKey;
  stack: string[];
  year: string;
};

const projects: Project[] = [
  {
    icon: Layers3,
    key: "saas",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2025",
  },
  {
    icon: Route,
    key: "booking",
    stack: ["React", "Mobile UX", "CMS"],
    year: "2025",
  },
  {
    icon: Gauge,
    key: "marketing",
    stack: ["Next.js", "Performance", "SEO"],
    year: "2024",
  },
];

const cardEntrance = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsPreview() {
  const t = useTranslations("Home.projects");
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <AnimatedSection className="relative overflow-hidden py-20 sm:py-24" id="projects">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-sky-400/[0.06] blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          className="max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.45, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="subheading max-w-2xl">{t("description")}</p>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.article
                className="group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)] transition-[border-color,box-shadow,transform] duration-300 hover:border-white/15 hover:shadow-[0_28px_88px_rgba(2,6,23,0.34)]"
                initial="hidden"
                key={project.key}
                transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                variants={cardEntrance}
                viewport={{ amount: 0.25, once: true }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
                whileInView="visible"
              >
                <div className="border-b border-white/8 px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                      </div>
                      <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {t(`items.${project.key}.category`)}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.68rem] font-medium text-slate-300">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] text-sky-200">
                      <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-[1.45rem] font-semibold tracking-tight text-white">
                        {t(`items.${project.key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {t(`items.${project.key}.summary`)}
                      </p>
                    </div>
                  </div>

                <dl className="mt-6 space-y-4 border-t border-white/10 pt-5">
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                    <dt className="text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {t("labels.built")}
                    </dt>
                    <dd className="text-sm leading-5 text-slate-300">
                      {t(`items.${project.key}.built`)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                    <dt className="text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-emerald-300/80">
                      {t("labels.outcome")}
                    </dt>
                    <dd className="text-sm font-medium leading-5 text-slate-200">
                      {t(`items.${project.key}.outcome`)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-400" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    aria-label={`${t("cta")}: ${t(`items.${project.key}.title`)}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-all duration-300 hover:border-sky-200/30 hover:bg-sky-200/10 hover:text-sky-100"
                    href="#contact"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
      <ClientLogos embedded />
    </AnimatedSection>
  );
}
