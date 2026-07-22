"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import {
  Check,
  MoveRight,
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
    description: string;
    label: string;
    value: string;
    visual: KpiVisual;
  }> = [
    { description: t("stats.execution"), label: t("panel.weeklyRhythm"), value: t("stats.weeklyValue"), visual: "execution" },
    { description: t("stats.handoffs"), label: t("panel.directDelivery"), value: "0", visual: "handoffs" },
    { description: t("stats.seniors"), label: t("panel.releaseQuality"), value: t("stats.qualityValue"), visual: "quality" },
    { description: t("stats.direct"), label: t("panel.timezoneCoverage"), value: t("stats.globalValue"), visual: "direct" },
  ];

  const renderKpiVisual = (visual: KpiVisual) => {
    if (visual === "execution") {
      return (
        <div className="h-[5.5rem] w-full overflow-hidden rounded-md border border-white/[0.07]">
          <svg aria-label="Simplified weekly delivery calendar" className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 224 64">
            <path d="M20 15 H224 M20 31 H224 M20 47 H224" stroke="white" strokeOpacity="0.08" />
            {[20, 49, 78, 107, 136, 165, 194, 223].map((x) => (
              <path d={`M${x} 0 V64`} key={x} stroke="white" strokeOpacity="0.07" />
            ))}

            {[
              ["M", "10"], ["T", "11"], ["W", "12"], ["T", "13"],
              ["F", "14"], ["S", "15"], ["S", "16"],
            ].map(([day, date], index) => (
              <g key={`${day}-${date}`}>
                <text fill={index === 2 ? "rgb(186 230 253)" : "rgb(148 163 184)"} fontSize="5.5" textAnchor="middle" x={34.5 + index * 29} y="6.5">{day}</text>
                <text fill={index === 2 ? "white" : "rgb(203 213 225)"} fontSize="5.5" fontWeight="600" textAnchor="middle" x={34.5 + index * 29} y="13.5">{date}</text>
              </g>
            ))}

            <text fill="rgb(203 213 225)" fontSize="6" fontWeight="500" textAnchor="middle" x="10" y="25">09</text>
            <text fill="rgb(203 213 225)" fontSize="6" fontWeight="500" textAnchor="middle" x="10" y="41">12</text>
            <text fill="rgb(203 213 225)" fontSize="6" fontWeight="500" textAnchor="middle" x="10" y="57">15</text>

            <rect fill="rgb(56 189 248)" fillOpacity="0.72" height="12" rx="2" width="24" x="23" y="18" />
            <rect fill="rgb(138 0 229)" fillOpacity="0.76" height="20" rx="2" width="24" x="52" y="34" />
            <rect fill="rgb(56 189 248)" fillOpacity="0.8" height="14" rx="2" width="24" x="81" y="19" />
            <rect fill="rgb(56 189 248)" fillOpacity="0.7" height="11" rx="2" width="24" x="110" y="42" />
            <rect fill="rgb(138 0 229)" fillOpacity="0.68" height="17" rx="2" width="24" x="139" y="23" />
            <rect fill="rgb(56 189 248)" fillOpacity="0.55" height="9" rx="2" width="24" x="168" y="48" />

            <motion.path animate={{opacity: [0.45, 1, 0.45]}} d="M78 37 H107" stroke="rgb(248 113 113)" strokeWidth="1" transition={{duration: 2.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}} />
            <motion.circle animate={{r: [1.3, 2.1, 1.3]}} cx="78" cy="37" fill="rgb(248 113 113)" transition={{duration: 2.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}} />
          </svg>
        </div>
      );
    }

    if (visual === "handoffs") {
      return (
        <div className="relative h-16 w-full border-b border-white/15">
          <div className="pointer-events-none absolute inset-x-0 top-3 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-8 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-[3.25rem] border-t border-dashed border-white/10" />
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 220 64">
            <defs>
              <linearGradient id="direct-delivery-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgb(56 189 248)" />
                <stop offset="100%" stopColor="rgb(138 0 229)" />
              </linearGradient>
            </defs>
            <path d="M18 34 C58 34 69 20 110 20 S164 42 202 28" fill="none" stroke="url(#direct-delivery-line)" strokeLinecap="round" strokeWidth="3" />
            <circle cx="18" cy="34" fill="rgb(56 189 248)" r="6" />
            <circle cx="18" cy="34" fill="rgb(224 242 254)" r="2" />
            <circle cx="202" cy="28" fill="rgb(138 0 229)" r="7" />
            <circle cx="202" cy="28" fill="none" r="10" stroke="rgb(192 132 252)" strokeOpacity="0.32" />
            <motion.circle animate={{cx: [18, 64, 110, 158, 202], cy: [34, 29, 20, 31, 28], opacity: [0, 1, 1, 1, 0]}} fill="rgb(224 242 254)" r="3.5" transition={{duration: 2.8, ease: "linear", repeat: Number.POSITIVE_INFINITY}} />
            <motion.circle animate={{cx: [18, 64, 110, 158, 202], cy: [34, 29, 20, 31, 28], opacity: [0, 0.35, 0.25, 0.2, 0]}} fill="rgb(125 211 252)" r="7" transition={{duration: 2.8, ease: "linear", repeat: Number.POSITIVE_INFINITY}} />
            <rect fill="rgb(11 17 32)" fillOpacity="0.92" height="12" rx="3" width="34" x="0" y="44" />
            <rect fill="rgb(11 17 32)" fillOpacity="0.92" height="12" rx="3" width="34" x="186" y="44" />
            <text fill="rgb(226 232 240)" fontSize="8" fontWeight="600" textAnchor="middle" x="17" y="53">BUILD</text>
            <text fill="rgb(226 232 240)" fontSize="8" fontWeight="600" textAnchor="middle" x="203" y="53">SHIP</text>
          </svg>
        </div>
      );
    }

    if (visual === "quality") {
      return (
        <div className="relative h-16 w-full border-b border-white/15">
          <div className="pointer-events-none absolute inset-x-0 top-3 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-8 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-[3.25rem] border-t border-dashed border-white/10" />
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 220 64">
            <circle cx="38" cy="30" fill="rgb(110 231 183)" fillOpacity="0.035" r="21" stroke="white" strokeOpacity="0.1" strokeWidth="5" />
            <motion.circle animate={{strokeDashoffset: [132, 18]}} cx="38" cy="30" fill="none" r="21" stroke="rgb(110 231 183)" strokeDasharray="132" strokeLinecap="round" strokeWidth="5" transform="rotate(-90 38 30)" transition={{duration: 2.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "mirror"}} />
            <text fill="white" fontSize="11" fontWeight="700" letterSpacing="0.7" textAnchor="middle" x="38" y="34">QA</text>
            {[15, 30, 45].map((y, index) => (
              <g key={y}>
                <rect fill="rgb(11 17 32)" fillOpacity="0.98" height="14" rx="3.5" width="38" x="68" y={y - 7} />
                <text fill="rgb(255 255 255)" fontSize="8" fontWeight="700" textAnchor="middle" x="87" y={y + 2.75}>{index === 0 ? "UNIT" : index === 1 ? "API" : "E2E"}</text>
                <rect fill="white" fillOpacity="0.07" height="7" rx="3.5" width="105" x="108" y={y - 3.5} />
                <motion.rect animate={{width: [28, 72 + index * 12, 55 + index * 9]}} fill={index === 1 ? "rgb(138 0 229)" : "rgb(110 231 183)"} fillOpacity="0.82" height="7" rx="3.5" x="108" y={y - 3.5} transition={{delay: index * 0.32, duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}} />
              </g>
            ))}
          </svg>
        </div>
      );
    }

    if (visual === "direct") {
      return (
        <div className="relative h-20 w-full border-b border-white/15">
          <div className="pointer-events-none absolute inset-x-0 top-4 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-10 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-16 border-t border-dashed border-white/10" />
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 220 80">
            <defs>
              <clipPath id="timezone-globe-clip">
                <circle cx="48" cy="40" r="27" />
              </clipPath>
            </defs>
            <circle cx="48" cy="40" fill="rgb(56 189 248)" fillOpacity="0.035" r="28" stroke="rgb(125 211 252)" strokeOpacity="0.85" strokeWidth="2" />
            <ellipse cx="48" cy="40" fill="none" rx="12" ry="28" stroke="rgb(125 211 252)" strokeOpacity="0.4" />
            <path d="M20 40 H76 M25 28 H71 M25 52 H71" fill="none" stroke="rgb(125 211 252)" strokeOpacity="0.34" />
            <motion.line
              animate={{opacity: [0, 0.9, 0], x1: [22, 48, 74], x2: [22, 48, 74]}}
              clipPath="url(#timezone-globe-clip)"
              y1="12"
              y2="68"
              stroke="rgb(138 0 229)"
              strokeLinecap="round"
              strokeWidth="2.5"
              transition={{duration: 3.6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}}
            />
            <rect fill="rgb(11 17 32)" fillOpacity="0.9" height="12" rx="3" width="38" x="29" y="34" />
            <text fill="white" fontSize="8" fontWeight="700" letterSpacing="0.8" textAnchor="middle" x="48" y="43">GLOBAL</text>

            {[26, 46, 66].map((y, index) => (
              <g key={y}>
                <rect fill="rgb(11 17 32)" fillOpacity="0.92" height="12" rx="3" width="34" x="86" y={y - 10} />
                <motion.circle
                  animate={{opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8]}}
                  cx={132 + index * 30}
                  cy={y - 6}
                  fill={index === 1 ? "rgb(138 0 229)" : "rgb(125 211 252)"}
                  r="4"
                  transition={{delay: index * 0.45, duration: 2.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}}
                />
                <text fill="rgb(226 232 240)" fontSize="8" fontWeight="600" x="89" y={y - 3}>
                  {index === 0 ? "UTC-5" : index === 1 ? "UTC" : "UTC+2"}
                </text>
              </g>
            ))}
          </svg>
        </div>
      );
    }

    return null;
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
          <div className="relative z-10 space-y-8 text-center lg:text-left">
            <motion.div className="space-y-6" variants={slideUp()}>
              <motion.div
                className="flex flex-wrap justify-center gap-2 lg:justify-start"
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

              <div className="relative mx-auto max-w-3xl lg:mx-0">
                <div className="absolute -left-4 top-8 -z-10 h-28 w-28 rounded-full bg-sky-400/12 blur-3xl" />
                <div className="absolute bottom-0 right-0 -z-10 h-24 w-24 rounded-full bg-brand-purple/10 blur-3xl" />
                <h1 className="heading max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                  {t.rich("title", {
                    accent: (chunks) => <span className="text-brand-purple">{chunks}</span>,
                  })}
                </h1>
              </div>

              <p className="subheading mx-auto max-w-2xl lg:mx-0">{t("description")}</p>
            </motion.div>

            <motion.div
              className="flex flex-row flex-wrap items-center justify-center gap-4 lg:justify-start"
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
                          className={`relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 ${index === 0 || index === 3 ? "sm:col-span-7" : "sm:col-span-5"}`}
                          variants={slideUp(index * 0.04)}
                        >
                          <div className="relative grid gap-3">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {item.label}
                            </p>
                            <div className={`flex items-center gap-3 ${item.visual === "execution" || item.visual === "handoffs" || item.visual === "quality" || item.visual === "direct" ? "w-full" : "justify-between"}`}>
                              {item.visual !== "execution" && item.visual !== "handoffs" && item.visual !== "quality" && item.visual !== "direct" ? (
                                <p className="text-[1.8rem] font-semibold leading-none tabular-nums text-white">
                                  {item.value}
                                </p>
                              ) : null}
                              <div className={item.visual === "execution" ? "h-[5.5rem] w-full" : item.visual === "handoffs" || item.visual === "quality" ? "h-16 w-full" : item.visual === "direct" ? "h-20 w-full" : "flex h-12 w-24 items-center justify-center"}>
                                {renderKpiVisual(item.visual)}
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-slate-400">
                              {item.description}
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
