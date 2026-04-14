"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  LaptopMinimal,
  LayoutTemplate,
  Smartphone,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { staggerContainer, slideUp } from "@/lib/animations";

type ServiceVisual = "apps" | "websites" | "fractional";

function ServicePreview({ visual }: { visual: ServiceVisual }) {
  switch (visual) {
    case "apps":
      return (
        <div className="relative h-44 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(7,10,18,0.98))] p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/16 group-hover:shadow-[0_22px_44px_rgba(2,6,23,0.26)]">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-sky-400/10 via-violet-400/8 to-transparent" />
          <div className="relative grid h-full grid-rows-[2.75rem_1fr] gap-2.5">
            <div className="flex h-11 items-center justify-between rounded-[0.95rem] border border-white/10 bg-slate-950/78 px-2.5 py-2">
              <div className="flex items-center gap-2 text-sky-200">
                <LaptopMinimal className="h-4.5 w-4.5" strokeWidth={1.9} />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Product UI
                </span>
              </div>
              <div className="flex items-center text-violet-200">
                <LayoutTemplate className="h-4 w-4" strokeWidth={1.8} />
              </div>
            </div>

            <div className="grid min-h-0 grid-cols-[1.45fr_0.75fr] gap-2.5">
              <div className="flex min-h-0 flex-col overflow-hidden rounded-[0.95rem] border border-white/8 bg-slate-950/84 p-2.5">
                <div className="mb-2 flex items-center justify-between">
                  <motion.div
                    animate={{ width: ["42%", "58%"] }}
                    className="h-2 rounded-full bg-white/14"
                    transition={{
                      duration: 3.8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                    }}
                  />
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <motion.div
                    animate={{ width: ["68%", "84%"] }}
                    className="h-1.5 rounded-full bg-white/10"
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                      delay: 0.08,
                    }}
                  />
                  <motion.div
                    animate={{ width: ["52%", "72%"] }}
                    className="h-1.5 rounded-full bg-white/10"
                    transition={{
                      duration: 4.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                      delay: 0.16,
                    }}
                  />
                </div>
                <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
                  {[0.78, 0.9, 0.7].map((opacity, index) => (
                    <motion.div
                      key={index}
                      animate={{ opacity: [opacity * 0.78, opacity] }}
                      className="rounded-[0.8rem] border border-white/8 bg-gradient-to-b from-sky-400/16 to-violet-400/10 p-2"
                      transition={{
                        duration: 3.1 + index * 0.35,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        ease: "linear",
                        delay: index * 0.12,
                      }}
                    >
                      <div className="mb-1.5 h-1.5 w-3/5 rounded-full bg-white/14" />
                      <div className="h-7 rounded-md bg-slate-950/38" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden rounded-[0.95rem] border border-white/8 bg-slate-950/84 p-2.5">
                <div className="mb-2 flex items-center justify-between text-violet-200">
                  <Smartphone className="h-4 w-4" strokeWidth={1.9} />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </div>
                <div className="space-y-1.5">
                  <motion.div
                    animate={{ width: ["58%", "78%"] }}
                    className="h-1.5 rounded-full bg-white/12"
                    transition={{
                      duration: 3.7,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    animate={{ width: ["44%", "64%"] }}
                    className="h-1.5 rounded-full bg-white/10"
                    transition={{
                      duration: 4.1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                      delay: 0.14,
                    }}
                  />
                </div>
                <motion.div
                  animate={{ opacity: [0.8, 1] }}
                  className="mt-3 flex-1 rounded-[0.9rem] border border-violet-300/14 bg-gradient-to-b from-violet-400/18 to-sky-400/10 p-2"
                  transition={{
                    duration: 3.6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                >
                  <div className="mb-2 h-1.5 w-2/3 rounded-full bg-white/14" />
                  <div className="space-y-1.5">
                    {[0.72, 0.56, 0.64].map((width, index) => (
                      <motion.div
                        key={index}
                        animate={{ width: [`${width * 100}%`, `${(width + 0.14) * 100}%`] }}
                        className="h-1.5 rounded-full bg-slate-950/32"
                        transition={{
                          duration: 3.4 + index * 0.3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                          ease: "linear",
                          delay: index * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      );
    case "websites":
      return (
        <div className="relative h-44 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(8,11,20,0.98))] p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/16 group-hover:shadow-[0_22px_44px_rgba(2,6,23,0.26)]">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-fuchsia-400/10 via-rose-400/8 to-transparent" />
          <div className="relative rounded-[1.2rem] border border-white/10 bg-slate-950/84 p-3 shadow-[0_18px_36px_rgba(2,6,23,0.22)]">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-fuchsia-200">
                <LayoutTemplate className="h-4.5 w-4.5" strokeWidth={1.8} />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Launch page
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-300/80" />
                <span className="h-2 w-2 rounded-full bg-fuchsia-300/70" />
                <span className="h-2 w-2 rounded-full bg-sky-300/70" />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-[1.1fr_0.7fr]">
              <div className="space-y-2">
                <motion.div
                  animate={{ width: ["72%", "88%"] }}
                  className="h-3 rounded-full bg-white/16"
                  transition={{
                    duration: 4.4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                />
                <motion.div
                  animate={{ width: ["56%", "80%"] }}
                  className="h-2 rounded-full bg-white/10"
                  transition={{
                    duration: 3.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                />
                <motion.div
                  animate={{ width: ["42%", "62%"] }}
                  className="h-2 rounded-full bg-white/10"
                  transition={{
                    duration: 4.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                    delay: 0.12,
                  }}
                />
                <motion.div
                  animate={{ opacity: [0.72, 1] }}
                  className="mt-3 inline-flex rounded-full bg-gradient-to-r from-fuchsia-400/70 to-rose-400/70 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-950"
                  transition={{
                    duration: 3.4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                >
                  CTA ready
                </motion.div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.03] }}
                className="rounded-[1rem] bg-gradient-to-br from-fuchsia-400/18 via-rose-400/14 to-slate-900/0"
                transition={{
                  duration: 5.6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </div>
      );
    case "fractional":
      return (
        <div className="relative h-44 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(7,10,18,0.98))] p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/16 group-hover:shadow-[0_22px_44px_rgba(2,6,23,0.26)]">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-emerald-400/10 via-cyan-400/8 to-transparent" />
          <div className="relative grid h-full grid-rows-[2.75rem_1fr] gap-2.5">
            <div className="flex h-11 items-center justify-between rounded-[0.95rem] border border-white/10 bg-slate-950/78 px-2.5 py-2">
              <div className="flex items-center gap-2 text-emerald-200">
                <Wrench className="h-4.5 w-4.5" strokeWidth={1.9} />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Senior support
                </span>
              </div>
              <motion.div
                animate={{ rotate: [0, 12, 0, -12, 0] }}
                transition={{
                  duration: 6.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <BriefcaseBusiness
                  className="h-4 w-4 text-emerald-200"
                  strokeWidth={1.8}
                />
              </motion.div>
            </div>
            <div className="grid min-h-0 grid-cols-2 gap-2.5">
              <motion.div
                animate={{ opacity: [0.78, 1] }}
                className="flex min-h-0 flex-col overflow-hidden rounded-[0.95rem] border border-white/8 p-2.5"
                transition={{
                  duration: 4.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "linear",
                }}
              >
                <div className="mb-2 flex items-center gap-2 text-cyan-200">
                  <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Audit
                  </span>
                </div>
                <div className="mt-auto space-y-1.5">
                  <motion.div
                    animate={{ width: ["72%", "88%"] }}
                    className="h-1.5 rounded-full bg-white/12"
                    transition={{
                      duration: 3.8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    animate={{ width: ["56%", "80%"] }}
                    className="h-1.5 rounded-full bg-white/10"
                    transition={{
                      duration: 4.1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                      delay: 0.12,
                    }}
                  />
                  <motion.div
                    animate={{ width: ["42%", "62%"] }}
                    className="h-1.5 rounded-full bg-white/10"
                    transition={{
                      duration: 4.4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "linear",
                      delay: 0.2,
                    }}
                  />
                </div>
              </motion.div>
              <div className="flex min-h-0 flex-col overflow-hidden rounded-[0.95rem] border border-white/8 bg-gradient-to-br from-emerald-400/14 to-cyan-400/10 p-2.5">
                <div className="mb-2 flex items-center gap-2 text-emerald-200">
                  <Send className="h-4 w-4" strokeWidth={1.8} />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Delivery
                  </span>
                </div>
                <motion.div
                  animate={{ y: [0, -2] }}
                  className="mt-auto grid grid-cols-3 gap-1.5"
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                >
                  {[0, 1, 2].map((item) => (
                    <motion.div
                      key={item}
                      animate={{ opacity: [0.72, 1], y: [0, -2.5] }}
                      className="h-8 rounded-md border border-white/12 bg-gradient-to-b from-emerald-300/22 to-cyan-400/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={{
                        duration: 3.2 + item * 0.45,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        ease: "linear",
                        delay: item * 0.32,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export function Services() {
  const t = useTranslations("Home.services");

  const services: Array<{
    title: string;
    description: string;
    visual: ServiceVisual;
  }> = [
    {
      title: t("items.apps.title"),
      description: t("items.apps.description"),
      visual: "apps",
    },
    {
      title: t("items.websites.title"),
      description: t("items.websites.description"),
      visual: "websites",
    },
    {
      title: t("items.fractional.title"),
      description: t("items.fractional.description"),
      visual: "fractional",
    },
  ];

  return (
    <AnimatedSection id="services">
      <Container>
        <div className="max-w-3xl space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="subheading">{t("description")}</p>
        </div>

        <motion.div
          className="mt-10 grid gap-4 lg:grid-cols-3"
          initial="hidden"
          variants={staggerContainer()}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={slideUp(index * 0.03)}>
              <Card className="group h-full rounded-[1.8rem] border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.92))] p-4 shadow-[0_24px_60px_rgba(11,15,25,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_70px_rgba(11,15,25,0.34)]">
                <div className="flex h-full flex-col gap-5">
                  <ServicePreview visual={service.visual} />

                  <div className="space-y-3 px-1 pb-1">
                    <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-sky-50">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </AnimatedSection>
  );
}










