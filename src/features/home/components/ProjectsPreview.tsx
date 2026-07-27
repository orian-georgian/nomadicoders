"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, CalendarDays, ChartColumnIncreasing, Gauge, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { projects } from "@/features/projects/data/projects";
import { Link } from "@/i18n/navigation";

import { ClientLogos } from "./ClientLogos";

const cardEntrance = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function ProjectsPreview() {
  const t = useTranslations("Home.projects");

  return (
    <AnimatedSection className="relative overflow-hidden py-10 sm:py-24" id="projects">
      <Container className="relative">
        <motion.div
          className="max-w-3xl space-y-4 text-left"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.45, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading whitespace-pre-line text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="subheading max-w-2xl">{t("description")}</p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...projects].reverse().map((project, index) => (
            <motion.article
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#101522] shadow-[0_24px_80px_rgba(2,6,23,0.28)] transition-[border-color,box-shadow] duration-300 hover:border-white/15 hover:shadow-[0_28px_88px_rgba(2,6,23,0.34)]"
              initial="hidden"
              key={project.key}
              transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              variants={cardEntrance}
              viewport={{ amount: 0.25, once: true }}
              whileInView="visible"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0b1120] px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                  </div>
                  <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {t(`items.${project.key}.category`)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-[#6ee7b7]/20 bg-[#6ee7b7]/10 px-2.5 py-1 text-[0.68rem] font-semibold text-[#6ee7b7]">
                  {t("labels.delivered")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="object-cover"
                      fill
                      sizes="44px"
                      src={project.clientImageSrc}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t(`items.${project.key}.client`)}</p>
                    <p className="mt-1 text-xs text-slate-500">{t("labels.client")} · {t(`items.${project.key}.category`)}</p>
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-[1.25] tracking-tight text-white">
                  {t(`items.${project.key}.title`)}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays className="h-4 w-4" />
                    <span>{t(`items.${project.key}.period`)}</span>
                  </div>
                  <a
                    aria-label={t("labels.ratingLink")}
                    className="group/rating flex items-center gap-2 text-[#6ee7b7] transition-colors hover:text-emerald-200"
                    href="#testimonials-section"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("select-testimonial", {
                          detail: project.testimonialKey,
                        }),
                      );
                    }}
                  >
                    <Star className="h-4 w-4 fill-current" />
                    <span>{t("labels.rating")}</span>
                    <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover/rating:translate-x-0.5 group-hover/rating:translate-y-0.5" />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span className="rounded-full border border-sky-300/15 bg-sky-300/[0.06] px-2.5 py-1 text-[0.68rem] text-sky-100" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {t(`items.${project.key}.summary`)}
                </p>

                <div className="mb-6 mt-5 space-y-2.5">
                  {[0, 1].map((kpiIndex) => (
                    <div className="flex min-w-0 items-center gap-2" key={kpiIndex}>
                      {kpiIndex === 0 ? (
                        <Gauge className="h-3.5 w-3.5 shrink-0 text-[#6ee7b7]" />
                      ) : (
                        <ChartColumnIncreasing className="h-3.5 w-3.5 shrink-0 text-[#6ee7b7]" />
                      )}
                      <strong className="shrink-0 text-sm font-semibold text-white">
                        {t(`items.${project.key}.kpis.${kpiIndex}.value`)}
                      </strong>
                      <p className="truncate text-[0.62rem] uppercase tracking-[0.1em] text-slate-500">
                        {t(`items.${project.key}.kpis.${kpiIndex}.label`)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {project.team.map((member) => (
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#101522]" key={member}>
                          <Image
                            alt={member}
                            className="object-cover"
                            fill
                            sizes="36px"
                            src={`/images/${member.toLowerCase()}.jpg`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">{t("labels.team")}</p>
                  </div>

                  <Link
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                    href={`/projects/${project.key}`}
                  >
                    {t("detailsCta")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
      <ClientLogos embedded />
    </AnimatedSection>
  );
}
