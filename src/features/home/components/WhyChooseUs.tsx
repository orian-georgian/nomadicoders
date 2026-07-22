"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { staggerContainer, slideUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ReasonKey = "direct" | "speed" | "ownership" | "consistency";

const reasons: Array<{
  accent: string;
  icon: typeof Layers3;
  key: ReasonKey;
}> = [
  {
    accent: "border-sky-300/20 bg-sky-300/10 text-sky-200",
    icon: Layers3,
    key: "direct",
  },
  {
    accent: "border-brand-purple/20 bg-brand-purple/10 text-brand-purple",
    icon: Zap,
    key: "speed",
  },
  {
    accent: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    icon: ShieldCheck,
    key: "ownership",
  },
  {
    accent: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    icon: Code2,
    key: "consistency",
  },
];

export function WhyChooseUs() {
  const t = useTranslations("Home.whyChooseUs");

  return (
    <AnimatedSection className="relative overflow-hidden" id="why-us">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.05, 0.98], x: [0, 18, -8], y: [0, -16, 8] }}
          className="absolute left-[-5rem] top-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.96, 1.04], x: [0, -20, 12], y: [0, 18, -10] }}
          className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl"
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      <Container>
        <div className="relative grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="space-y-4 text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
          </div>

          <motion.ul
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            variants={staggerContainer()}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.li
                  key={reason.key}
                  className="glass group relative overflow-hidden rounded-3xl p-6"
                  variants={slideUp(index * 0.03)}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.1),transparent_36%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl border",
                          reason.accent,
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="text-sm font-semibold text-sky-300">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {t(`items.${reason.key}.title`)}
                      </h3>
                      <p className="text-base leading-7 text-slate-300">
                        {t(`items.${reason.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </AnimatedSection>
  );
}
