"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Circle,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";

const comparisonRows = ["team", "communication", "decisions", "ownership"] as const;

export function WhyChooseUs() {
  const t = useTranslations("Home.whyChooseUs");
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <AnimatedSection className="relative overflow-hidden" id="why-us">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 top-20 h-96 w-96 rounded-full bg-brand-purple/[0.045] blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          className="max-w-3xl space-y-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.45, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading text-3xl sm:text-4xl">{t("comparison.title")}</h2>
          <p className="subheading max-w-2xl">{t("comparison.description")}</p>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)]"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.15, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {t("comparison.windowLabel")}
              </span>
            </div>
            <span className="hidden rounded-full bg-sky-300/[0.07] px-2.5 py-1 text-[0.68rem] font-medium text-sky-200 sm:block">
              {t("comparison.windowStatus")}
            </span>
          </div>

          <div className="grid border-b border-white/8 lg:grid-cols-2">
            <div className="relative overflow-hidden border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("comparison.typical.eyebrow")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-200">
                    {t("comparison.typical.title")}
                  </h3>
                </div>
                <span className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1 text-xs text-slate-500">
                  {t("comparison.typical.status")}
                </span>
              </div>

              <div className="mt-9 flex min-h-24 items-center justify-between gap-2">
                {(["client", "manager", "lead", "developer"] as const).map((role, index, roles) => (
                  <div className="contents" key={role}>
                    <div className="flex min-w-0 flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.025] text-slate-500 sm:h-12 sm:w-12">
                        {index === 0 ? <UserRound className="h-5 w-5" /> : <Circle className="h-3 w-3" fill="currentColor" />}
                      </div>
                      <span className="max-w-16 truncate text-[0.62rem] font-medium text-slate-500 sm:max-w-none sm:text-xs">
                        {t(`comparison.roles.${role}`)}
                      </span>
                    </div>
                    {index < roles.length - 1 ? (
                      <div className="relative mb-6 h-px min-w-3 flex-1 border-t border-dashed border-slate-700">
                        <motion.span
                          animate={reducedMotion ? undefined : { opacity: [0.25, 0.8, 0.25] }}
                          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-600"
                          transition={{ delay: index * 0.3, duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="mt-6 border-l-2 border-slate-700 pl-4 text-sm leading-6 text-slate-400">
                {t("comparison.typical.note")}
              </p>
            </div>

            <div className="relative overflow-hidden p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(125,211,252,0.08),transparent_48%)]"
              />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                    {t("comparison.nomadicoders.eyebrow")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {t("comparison.nomadicoders.title")}
                  </h3>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-1 text-xs text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  {t("comparison.nomadicoders.status")}
                </span>
              </div>

              <div className="relative mt-9 grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-200">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">
                    {t("comparison.roles.client")}
                  </span>
                </div>

                <div className="relative mb-6 h-4">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 12"
                  >
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="senior-delivery-arrow"
                        x1="1"
                        x2="99"
                        y1="6"
                        y2="6"
                      >
                        <stop offset="0%" stopColor="#7dd3fc" />
                        <stop offset="62%" stopColor="#7dd3fc" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 1 6 H 99"
                      fill="none"
                      stroke="url(#senior-delivery-arrow)"
                      strokeDasharray="1 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.25"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <motion.span
                    animate={reducedMotion ? undefined : {
                      left: ["1%", "10.5%", "86.5%", "96%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200 shadow-[0_0_9px_rgba(186,230,253,0.75)]"
                    style={reducedMotion ? { left: "50%" } : undefined}
                    transition={{
                      duration: 3.2,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                      times: [0, 0.1, 0.9, 1],
                    }}
                  />
                  <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                    {t("comparison.nomadicoders.direct")}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={reducedMotion ? undefined : { scale: [1, 1.035, 1] }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/[0.07] text-sky-200"
                    transition={{ duration: 3.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                  >
                    <UsersRound className="h-5 w-5" />
                  </motion.div>
                  <span className="whitespace-nowrap text-xs font-medium text-slate-200">
                    {t("comparison.roles.seniorTeam")}
                  </span>
                </div>
              </div>

              <p className="relative mt-6 border-l-2 border-sky-300 pl-4 text-sm leading-6 text-slate-300">
                {t("comparison.nomadicoders.note")}
              </p>
            </div>
          </div>

          <div>
            <div className="hidden grid-cols-[0.55fr_1fr_1fr] border-b border-white/8 px-6 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500 md:grid md:gap-6">
              <span>{t("comparison.table.criteria")}</span>
              <span>{t("comparison.typical.title")}</span>
              <span className="text-sky-300">{t("comparison.nomadicoders.title")}</span>
            </div>

            {comparisonRows.map((row, index) => (
              <motion.div
                className="group grid gap-3 border-b border-white/8 px-5 py-5 last:border-b-0 md:grid-cols-[0.55fr_1fr_1fr] md:items-center md:gap-6 md:px-6"
                initial={{ opacity: 0, y: 10 }}
                key={row}
                transition={{ delay: 0.12 + index * 0.06, duration: 0.45 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="text-sm font-semibold text-white">
                  {t(`comparison.table.${row}.label`)}
                </span>

                <div className="text-sm leading-6 text-slate-500">
                  {t(`comparison.table.${row}.typical`)}
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-sky-300/[0.035] px-3 py-2 text-sm leading-6 text-slate-200 transition-colors group-hover:bg-sky-300/[0.06]">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                  <span>{t(`comparison.table.${row}.nomadicoders`)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/8 bg-white/[0.018] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-sky-300" />
              <p className="text-sm font-medium text-slate-200">{t("comparison.closing")}</p>
            </div>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
              href="#projects"
            >
              {t("comparison.proofCta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </AnimatedSection>
  );
}
