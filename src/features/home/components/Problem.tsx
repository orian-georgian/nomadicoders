"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Layers3, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { staggerContainer, slideUp } from "@/lib/animations";

type BottleneckVisual = "layers" | "handoff" | "alert";

function renderBottleneckVisual(visual: BottleneckVisual) {
  switch (visual) {
    case "layers":
      return (
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-200">
          <motion.div
            animate={{ y: [0, -2, 0], opacity: [0.75, 1, 0.75] }}
            transition={{
              duration: 3.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Layers3 className="h-6 w-6" strokeWidth={1.8} />
          </motion.div>
          <motion.span
            animate={{ width: [16, 24, 16], opacity: [0.28, 0.55, 0.28] }}
            className="absolute -right-1 top-3 h-px rounded-full bg-sky-300"
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.span
            animate={{ width: [12, 20, 12], opacity: [0.22, 0.48, 0.22] }}
            className="absolute -right-1 bottom-3 h-px rounded-full bg-sky-300/80"
            transition={{
              duration: 2.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
        </div>
      );
    case "handoff":
      return (
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-200">
          <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-violet-200/30" />
          <motion.span
            animate={{ x: [-10, 10, -10] }}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-200"
            transition={{
              duration: 3.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <ArrowLeftRight className="relative h-5 w-5" strokeWidth={1.8} />
        </div>
      );
    case "alert":
      return (
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-100">
          <motion.span
            animate={{ scale: [0.92, 1.18, 0.92], opacity: [0.18, 0.45, 0.18] }}
            className="absolute inset-1 rounded-[1rem] border border-amber-200/30"
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            animate={{ y: [0, -1.5, 0] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <TriangleAlert className="h-6 w-6" strokeWidth={1.8} />
          </motion.div>
        </div>
      );
  }
}

export function Problem() {
  const t = useTranslations("Home.problem");

  const painPoints: Array<{ description: string; visual: BottleneckVisual }> = [
    { description: t("items.scope"), visual: "layers" },
    { description: t("items.speed"), visual: "handoff" },
    { description: t("items.quality"), visual: "alert" },
  ];

  return (
    <AnimatedSection id="problem">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
          </div>

          <motion.div
            className="grid gap-4 sm:grid-cols-3"
            initial="hidden"
            variants={staggerContainer()}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {painPoints.map((point, index) => (
              <motion.div
                key={point.description}
                variants={slideUp(index * 0.03)}
              >
                <Card className="relative h-full overflow-hidden rounded-[1.75rem] border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 p-0">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_36%)]" />
                  <motion.div
                    animate={{ x: ["-120%", "140%"] }}
                    className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-50"
                    transition={{
                      duration: 4.2 + index * 0.45,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <div className="relative flex h-full flex-col gap-4 p-2">
                    <div className="flex items-start justify-between gap-4">
                      {renderBottleneckVisual(point.visual)}
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-base leading-6 text-slate-200">
                      {point.description}
                    </p>

                    <div className="mt-auto h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
