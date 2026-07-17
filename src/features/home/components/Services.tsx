"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Gauge,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";

type ServiceKey =
  | "websites"
  | "apps"
  | "aiFeatures";

type Service = {
  accent: {
    dot: string;
    icon: string;
    panel: string;
  };
  icon: LucideIcon;
  key: ServiceKey;
};

const services: Service[] = [
  {
    accent: { dot: "bg-sky-300", icon: "bg-sky-300/10 text-sky-200", panel: "border-sky-300/15 bg-sky-300/[0.06]" },
    icon: Gauge,
    key: "websites",
  },
  {
    accent: { dot: "bg-brand-purple", icon: "bg-brand-purple/10 text-brand-purple", panel: "border-brand-purple/15 bg-brand-purple/[0.06]" },
    icon: LayoutDashboard,
    key: "apps",
  },
  {
    accent: { dot: "bg-fuchsia-300", icon: "bg-fuchsia-300/10 text-fuchsia-200", panel: "border-fuchsia-300/15 bg-fuchsia-300/[0.06]" },
    icon: Bot,
    key: "aiFeatures",
  },
];

const cardEntrance = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Services() {
  const t = useTranslations("Home.services");
  return (
    <AnimatedSection id="services">
      <Container>
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
          <p className="subheading">{t("description")}</p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)] transition-[border-color,box-shadow] duration-300 hover:border-white/15 hover:shadow-[0_28px_88px_rgba(2,6,23,0.34)]"
                initial="hidden"
                key={service.key}
                transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                variants={cardEntrance}
                viewport={{ amount: 0.2, once: true }}
                whileInView="visible"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                    </div>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {t("eyebrow")}
                    </span>
                  </div>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${service.accent.icon}`}>
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {t(`items.${service.key}.summary`)}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {t("labels.includes")}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {(["one", "two", "three"] as const).map((item) => (
                      <li className="flex gap-2.5 text-sm leading-5 text-slate-300" key={item}>
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${service.accent.dot}`} />
                        {t(`items.${service.key}.includes.${item}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-6 rounded-xl border px-3.5 py-3 pt-3.5 ${service.accent.panel}`}>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-300">
                    {t("labels.idealFor")}
                  </p>
                  <p className="mt-1.5 text-sm leading-5 text-slate-200">
                    {t(`items.${service.key}.idealFor`)}
                  </p>
                </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </AnimatedSection>
  );
}
