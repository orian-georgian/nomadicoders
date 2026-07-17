"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import {
  Check,
  Helicopter,
  MapPin,
  MoveRight,
  PlaneTakeoff,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BuildVelocityCardContent } from "@/components/shared/hero/BuildVelocityCardContent";
import { HeroMetricCard } from "@/components/shared/hero/HeroMetricCard";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";

import { CoverageMetrics } from "./CoverageMetrics";

type KpiVisual = "execution" | "handoffs" | "quality" | "direct";

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
    { label: t("stats.execution"), value: t("stats.weeklyValue"), visual: "execution" },
    { label: t("stats.handoffs"), value: "0", visual: "handoffs" },
    { label: t("stats.seniors"), value: t("stats.qualityValue"), visual: "quality" },
    { label: t("stats.direct"), value: t("stats.globalValue"), visual: "direct" },
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
            <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-purple" />
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
              <PlaneTakeoff className="h-4 w-4 text-sky-300" strokeWidth={1.75} />
            </motion.div>
          </div>
        );
      case "quality":
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
              <ShieldCheck className="h-6 w-6 text-emerald-300" strokeWidth={1.8} />
            </motion.div>
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
              className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-300"
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
    <section className="section relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden pb-10 pt-12 sm:pt-16 lg:pb-16 lg:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 0.98], x: [0, 24, -8], y: [0, -18, 10] }}
          className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl sm:h-72 sm:w-72"
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.92, 1.08], x: [0, -22, 12], y: [0, 20, -10] }}
          className="absolute right-[-4rem] top-20 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl sm:h-80 sm:w-80"
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
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
              <motion.div
                className="flex flex-wrap gap-2"
                variants={fadeIn()}
              >
                {[t("eyebrowSenior"), t("eyebrowAi")].map((label) => (
                  <span
                    className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100"
                    key={label}
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.5} />
                    {label}
                  </span>
                ))}
              </motion.div>

              <div className="relative max-w-3xl">
                <div className="absolute -left-4 top-8 -z-10 h-28 w-28 rounded-full bg-sky-400/12 blur-3xl" />
                <div className="absolute bottom-0 right-0 -z-10 h-24 w-24 rounded-full bg-brand-purple/10 blur-3xl" />
                <h1 className="heading max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                  {t.rich("title", {
                    accent: (chunks) => <span className="text-brand-purple">{chunks}</span>,
                  })}
                </h1>
              </div>

              <p className="subheading max-w-2xl">{t("description")}</p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              variants={fadeIn(0.08)}
            >
              <a
                className={buttonVariants({
                  className: "group inline-flex items-center gap-2",
                  size: "lg",
                })}
                href="#contact"
              >
                {t("primaryCta")}
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
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
            <div className="relative mx-auto max-w-xl lg:ml-auto lg:mr-0">
              <motion.div
                className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)]"
                initial={{ opacity: 0, y: 26 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <div className="border-b border-white/8 px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                        </div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                          {t("panel.eyebrow")}
                        </p>
                      </div>
                      <span className="rounded-full bg-brand-purple/10 px-2.5 py-1 text-[0.68rem] font-medium text-brand-purple">
                        {t("panel.status")}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 sm:p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <motion.div className="h-full" variants={slideUp(0.05)}>
                        <HeroMetricCard
                          className="bg-white/[0.035]"
                          title={t("panel.buildVelocity")}
                        >
                          <BuildVelocityCardContent
                            description={t("stats.delivery")}
                            signal={t("panel.aiSignal")}
                            value="AI"
                          />
                        </HeroMetricCard>
                      </motion.div>

                      <motion.div className="h-full" variants={slideUp(0.12)}>
                        <HeroMetricCard
                          className="bg-white/[0.035]"
                          title={t("panel.coverage")}
                        >
                          <CoverageMetrics stats={coverageStats} />
                        </HeroMetricCard>
                      </motion.div>
                    </div>

                    <motion.div
                      className="grid gap-4 sm:grid-cols-12"
                      variants={staggerContainer(0.08, 0.2)}
                    >
                      {additionalStats.map((item, index) => (
                        <motion.div
                          key={item.label}
                          className={`group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] ${index === 0 || index === 3 ? "sm:col-span-7" : "sm:col-span-5"}`}
                          variants={slideUp(index * 0.04)}
                        >
                          <div className="relative grid gap-3">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-[1.8rem] font-semibold leading-none tabular-nums text-white">
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
