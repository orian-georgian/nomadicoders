"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import {
  Helicopter,
  MapPin,
  PlaneTakeoff,
  Radar,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";

import { CoverageMetrics } from "./CoverageMetrics";

type KpiVisual = "execution" | "handoffs" | "seniors" | "direct";

export function Hero() {
  const t = useTranslations("Home.hero");

  const coverageStats = useMemo(
    () => [
      { label: t("stats.years"), value: 12, suffix: "+" },
      { label: t("stats.projects"), value: 40, suffix: "+" },
    ],
    [t],
  );

  const additionalStats: Array<{
    label: string;
    value: string;
    visual: KpiVisual;
  }> = [
    { label: t("stats.execution"), value: "100%", visual: "execution" },
    { label: t("stats.handoffs"), value: "0", visual: "handoffs" },
    { label: t("stats.seniors"), value: "2", visual: "seniors" },
    { label: t("stats.direct"), value: "1", visual: "direct" },
  ];

  const renderKpiVisual = (visual: KpiVisual) => {
    switch (visual) {
      case "execution":
        return (
          <div className="relative flex h-11 w-11 items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 5.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Radar className="h-6 w-6 text-slate-100" strokeWidth={1.7} />
            </motion.div>
            <motion.span
              animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.2, 0.6, 0.2] }}
              className="absolute h-3 w-3 rounded-full border border-sky-300/40"
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      case "handoffs":
        return (
          <div className="relative h-11 w-16">
            <div className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/20" />
            <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300" />
            <motion.span
              animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.9, 0.45] }}
              className="absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-sky-300/35"
              transition={{
                duration: 2.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              animate={{ x: [0, 28, 0] }}
              className="absolute left-1 top-1/2 -translate-y-1/2"
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <PlaneTakeoff
                className="h-4 w-4 text-sky-300"
                strokeWidth={1.75}
              />
            </motion.div>
          </div>
        );
      case "seniors":
        return (
          <div className="relative flex h-11 w-16 items-center justify-center">
            <motion.div
              animate={{ y: [0, -1.5, 0], opacity: [0.82, 1, 0.82] }}
              className="relative"
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <UsersRound
                className="h-6 w-6 text-slate-100"
                strokeWidth={1.8}
              />
            </motion.div>
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
              className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-300 to-violet-300"
              transition={{
                duration: 2.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      case "direct":
        return (
          <div className="relative h-11 w-16">
            <div className="absolute left-2 right-4 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/20" />
            <motion.div
              animate={{ x: [0, 26, 0], y: [4, 0, 4] }}
              className="absolute left-1 top-1/2 -translate-y-1/2"
              transition={{
                duration: 3.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Helicopter className="h-4 w-4 text-sky-300" strokeWidth={1.75} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
              className="absolute right-0 top-1/2 -translate-y-1/2"
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <MapPin className="h-4 w-4 text-slate-100" strokeWidth={1.75} />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <section className="section relative overflow-hidden pb-10 pt-12 sm:pt-16 lg:pb-16 lg:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 0.98], x: [0, 24, -8], y: [0, -18, 10] }}
          className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-sky-400/18 blur-3xl sm:h-72 sm:w-72"
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.92, 1.08], x: [0, -22, 12], y: [0, 20, -10] }}
          className="absolute right-[-4rem] top-20 h-64 w-64 rounded-full bg-violet-500/16 blur-3xl sm:h-80 sm:w-80"
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
      </div>

      <Container>
        <motion.div
          className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10"
          initial="hidden"
          variants={staggerContainer(0.14, 0.08)}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative z-10 space-y-8">
            <motion.div className="space-y-6" variants={slideUp()}>
              <motion.span
                className="glass relative inline-flex items-center gap-3 overflow-hidden rounded-full px-4 py-2 text-sky-100"
                variants={fadeIn()}
              >
                <motion.span
                  animate={{
                    opacity: [0.65, 1, 0.7],
                    scale: [0.96, 1.08, 0.96],
                  }}
                  className="relative h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]"
                  transition={{
                    duration: 3.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                  {t("eyebrow")}
                </span>
              </motion.span>

              <div className="relative max-w-3xl">
                <div className="absolute -left-4 top-8 -z-10 h-28 w-28 rounded-full bg-sky-400/18 blur-3xl" />
                <div className="absolute bottom-0 right-0 -z-10 h-24 w-24 rounded-full bg-violet-400/16 blur-3xl" />
                <h1 className="heading max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                  {t("title")}
                </h1>
              </div>

              <p className="subheading max-w-2xl">{t("description")}</p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              variants={fadeIn(0.08)}
            >
              <a className={buttonVariants({ size: "lg" })} href="#contact">
                {t("primaryCta")}
              </a>
              <a
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href="#projects"
              >
                {t("secondaryCta")}
              </a>
            </motion.div>
          </div>

          <motion.div className="relative" variants={fadeIn(0.14)}>
            <motion.div
              animate={{ rotate: [0, 6, 0], scale: [1, 1.04, 1] }}
              className="absolute inset-4 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-2xl"
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="relative mx-auto max-w-xl">
              <div className="absolute right-4 top-3 z-20 hidden sm:block">
                <div className="rounded-2xl border border-white/10  px-3 py-3 shadow-[0_16px_40px_rgba(2,6,23,0.38)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-300">
                    {t("badges.performanceTitle")}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {t("badges.performanceDescription")}
                  </p>
                </div>
              </div>

              <motion.div
                className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_80px_rgba(2,6,23,0.32)] sm:p-5"
                initial={{ rotateX: 10, rotateY: -8, opacity: 0, y: 26 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileInView={{ rotateX: 0, rotateY: 0, opacity: 1, y: 0 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />
                <motion.div
                  animate={{ x: ["-120%", "140%"] }}
                  className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-70"
                  transition={{
                    duration: 3.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <div className="relative">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-300">
                      Nomadicoders
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {t("panel.title")}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <motion.div
                        className="rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-sky-500/14 via-slate-900 to-violet-500/12 p-5"
                        variants={slideUp(0.05)}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {t("panel.buildVelocity")}
                        </p>
                        <div className="mt-5 flex items-end gap-3">
                          <p className="text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
                            2x
                          </p>
                          <div className="mb-1 ml-auto flex h-16 items-end gap-1.5">
                            {[58, 82, 68, 100].map((height, index) => (
                              <motion.span
                                key={height}
                                animate={{
                                  height: [
                                    `${Math.max(20, Math.round(height * 0.32))}%`,
                                    `${height}%`,
                                    `${Math.max(32, Math.round(height * 0.74))}%`,
                                  ],
                                }}
                                className="w-2.5 rounded-full bg-gradient-to-t from-sky-400 to-violet-400"
                                style={{
                                  opacity: 0.7 + index * 0.08,
                                  transformOrigin: "bottom",
                                }}
                                transition={{
                                  duration: 4.8 + index * 0.35,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "mirror",
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {t("stats.delivery")}
                        </p>
                      </motion.div>

                      <motion.div
                        className="rounded-[1.35rem] border border-white/10 p-5"
                        variants={slideUp(0.12)}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {t("panel.coverage")}
                        </p>
                        <CoverageMetrics stats={coverageStats} />
                      </motion.div>
                    </div>

                    <motion.div
                      className="grid gap-4 sm:grid-cols-12"
                      variants={staggerContainer(0.08, 0.2)}
                    >
                      {additionalStats.map((item, index) => (
                        <motion.div
                          key={item.label}
                          className={`rounded-[1.25rem] border border-white/10 p-4 ${index === 0 || index === 3 ? "sm:col-span-7" : "sm:col-span-5"}`}
                          variants={slideUp(index * 0.04)}
                        >
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-[1.85rem] font-semibold leading-none tabular-nums text-white">
                                {item.value}
                              </p>
                              <div className="flex h-11 w-16 items-center justify-center">
                                {renderKpiVisual(item.visual)}
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-slate-400">
                              {item.label}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}


