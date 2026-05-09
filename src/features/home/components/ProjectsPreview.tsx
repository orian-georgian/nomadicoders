"use client";

import { useState } from "react";

import {
  ArrowUpRight,
  Activity,
  Gauge,
  Layers3,
  Route,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type ProjectVisual = "saas" | "booking" | "marketing";

type ShowcaseProject = {
  accent: string;
  category: string;
  description: string;
  imageSrc?: string;
  outcome: string;
  stack: string[];
  status: string;
  title: string;
  visual: ProjectVisual;
  year: string;
};

type PointerPosition = {
  x: number;
  y: number;
};

const stackByProject: Record<ProjectVisual, string[]> = {
  saas: ["Next.js", "TypeScript", "Realtime", "Dashboards"],
  booking: ["React", "Mobile UX", "Checkout", "CMS"],
  marketing: ["Next.js", "Performance", "SEO", "Design System"],
};

const visualAccent: Record<ProjectVisual, string> = {
  saas: "from-sky-300 via-cyan-300 to-violet-300",
  booking: "from-emerald-300 via-sky-300 to-cyan-200",
  marketing: "from-violet-300 via-fuchsia-300 to-sky-300",
};

const cardEntrance = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function ProjectMockup({
  imageSrc,
  title,
  visual,
}: {
  imageSrc?: string;
  title: string;
  visual: ProjectVisual;
}) {
  if (imageSrc) {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-3">
        <Image
          alt={`${title} project preview`}
          className="rounded-[1.1rem] object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 30vw"
          src={imageSrc}
        />
        <div className="absolute inset-3 rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.42)),radial-gradient(circle_at_top_right,rgba(125,211,252,0.22),transparent_34%)]" />
      </div>
    );
  }

  if (visual === "booking") {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(52,211,153,0.22),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.2),transparent_32%)]" />
        <div className="relative mx-auto flex h-full max-w-[15rem] flex-col rounded-[1.75rem] border border-white/12 bg-slate-950/80 p-3 shadow-[0_24px_70px_rgba(2,6,23,0.45)]">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
          <div className="rounded-2xl bg-gradient-to-br from-emerald-300/20 to-sky-400/10 p-3">
            <div className="h-28 rounded-xl bg-[linear-gradient(135deg,rgba(15,23,42,0.2),rgba(14,165,233,0.2)),radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.42),transparent_12%)]" />
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-28 rounded-full bg-white/70" />
            <div className="h-2 w-36 rounded-full bg-slate-400/45" />
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                <Route className="h-4 w-4 text-emerald-200" />
                <div className="mt-3 h-2 w-14 rounded-full bg-white/50" />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                <Gauge className="h-4 w-4 text-sky-200" />
                <div className="mt-3 h-2 w-12 rounded-full bg-white/50" />
              </div>
            </div>
          </div>
          <div className="mt-auto rounded-2xl bg-gradient-to-r from-emerald-300 to-sky-300 px-4 py-3 text-center text-xs font-semibold text-slate-950">
            Confirm booking
          </div>
        </div>
      </div>
    );
  }

  if (visual === "marketing") {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(168,85,247,0.24),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(56,189,248,0.18),transparent_28%)]" />
        <div className="relative h-full rounded-[1.2rem] border border-white/10 bg-slate-950/75 p-4 shadow-[0_24px_70px_rgba(2,6,23,0.45)]">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="h-2 w-20 rounded-full bg-white/20" />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="h-4 w-28 rounded-full bg-sky-300/70" />
              <div className="space-y-2">
                <div className="h-6 w-full rounded-full bg-white/80" />
                <div className="h-6 w-4/5 rounded-full bg-white/55" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-400/40" />
              <div className="h-2 w-2/3 rounded-full bg-slate-400/35" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-300/18 via-slate-900 to-sky-300/12 p-3">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.08]" />
                <div className="rounded-xl bg-white/[0.14]" />
                <div className="col-span-2 rounded-xl bg-white/[0.1]" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            {[84, 97, 1.2].map((value, index) => (
              <div
                className="rounded-xl border border-white/10 bg-white/[0.055] p-3"
                key={value}
              >
                <p className="text-lg font-semibold text-white">
                  {value}
                  {index < 2 ? "%" : "s"}
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(139,92,246,0.22),transparent_30%)]" />
      <div className="relative h-full rounded-[1.2rem] border border-white/10 bg-slate-950/75 p-4 shadow-[0_24px_70px_rgba(2,6,23,0.45)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="h-3 w-24 rounded-full bg-white/75" />
            <div className="mt-2 h-2 w-36 rounded-full bg-slate-400/40" />
          </div>
          <Activity className="h-5 w-5 text-sky-200" />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-3">
            {[72, 88, 64].map((width) => (
              <div className="rounded-xl border border-white/10 bg-white/[0.055] p-3" key={width}>
                <div className="h-2 rounded-full bg-sky-200/70" style={{ width: `${width}%` }} />
                <div className="mt-3 h-7 rounded-lg bg-white/[0.08]" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-end gap-2">
              {[48, 78, 58, 92, 68, 84].map((height, index) => (
                <div
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-sky-400/30 to-cyan-200/90"
                  key={`${height}-${index}`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.07] p-3">
                <div className="h-7 w-14 rounded-full bg-white/80" />
                <div className="mt-3 h-2 w-20 rounded-full bg-slate-400/45" />
              </div>
              <div className="rounded-xl bg-white/[0.07] p-3">
                <Layers3 className="h-6 w-6 text-violet-200" />
                <div className="mt-3 h-2 w-20 rounded-full bg-slate-400/45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  project,
  index,
}: {
  index: number;
  project: ShowcaseProject;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const [pointer, setPointer] = useState<PointerPosition>({ x: 50, y: 28 });

  return (
    <motion.article
      className="group relative flex h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-[1px] shadow-[0_28px_90px_rgba(2,6,23,0.34)]"
      initial="hidden"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
      }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={cardEntrance}
      viewport={{ amount: 0.22, once: true }}
      whileHover={reducedMotion ? undefined : { y: -8 }}
      whileInView="visible"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70",
          `bg-gradient-to-br ${project.accent}`,
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(125, 211, 252, 0.22), transparent 28%)`,
        }}
      />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950/88">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : { x: ["-45%", "45%", "-45%"], opacity: [0.12, 0.28, 0.12] }
          }
          className={cn(
            "absolute -top-24 left-0 h-48 w-2/3 rotate-12 blur-3xl",
            `bg-gradient-to-r ${project.accent}`,
          )}
          transition={{ duration: 8 + index, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative p-4 pb-0 sm:p-5 sm:pb-0">
          <motion.div
            className="aspect-[1.18/1] min-h-[16rem] overflow-hidden rounded-[1.45rem] sm:aspect-[1.28/1] xl:aspect-[1.08/1]"
            whileHover={reducedMotion ? undefined : { scale: 1.025 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectMockup
              imageSrc={project.imageSrc}
              title={project.title}
              visual={project.visual}
            />
          </motion.div>
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sky-200">
                {project.category}
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
                {project.status}
              </span>
            </div>
            <span className="ml-auto text-xs font-medium tabular-nums text-slate-400">
              {project.year}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-white md:min-h-[4rem]">
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-slate-300/95 md:min-h-[7rem] xl:min-h-[8.75rem]">
              {project.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap content-start gap-2 md:min-h-[4.5rem]">
            {project.stack.map((tech) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-300"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <p className="mb-5 border-l border-sky-300/40 pl-4 text-sm leading-6 text-slate-300">
              {project.outcome}
            </p>
            <a
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-white outline-none transition-colors hover:text-sky-200 focus-visible:text-sky-200"
              href="#contact"
            >
              View Project
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsPreview() {
  const t = useTranslations("Home.projects");
  const reducedMotion = Boolean(useReducedMotion());

  const projects: ShowcaseProject[] = [
    {
      accent: visualAccent.saas,
      category: t("items.saas.category"),
      description: t("items.saas.summary"),
      outcome: t("items.saas.outcome"),
      stack: stackByProject.saas,
      status: "Live product",
      title: t("items.saas.title"),
      visual: "saas",
      year: "2025",
    },
    {
      accent: visualAccent.booking,
      category: t("items.booking.category"),
      description: t("items.booking.summary"),
      outcome: t("items.booking.outcome"),
      stack: stackByProject.booking,
      status: "UX rebuild",
      title: t("items.booking.title"),
      visual: "booking",
      year: "2025",
    },
    {
      accent: visualAccent.marketing,
      category: t("items.marketing.category"),
      description: t("items.marketing.summary"),
      outcome: t("items.marketing.outcome"),
      stack: stackByProject.marketing,
      status: "Launch ready",
      title: t("items.marketing.title"),
      visual: "marketing",
      year: "2024",
    },
  ];

  return (
    <AnimatedSection
      className="relative overflow-hidden py-24 sm:py-28"
      id="projects"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0),rgba(15,23,42,0.18)_38%,rgba(11,15,25,0)_100%)]" />
        <div className="absolute left-[-7rem] top-10 h-72 w-72 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.07] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <Container className="relative">
        <motion.div
          className="max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.45, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="subheading">{t("description")}</p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ShowcaseCard index={index} key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
