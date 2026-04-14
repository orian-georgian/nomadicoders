"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

import {AnimatedSection} from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import {Container} from "@/components/ui/Container";
import {staggerContainer, slideUp} from "@/lib/animations";

export function WhyChooseUs() {
  const t = useTranslations("Home.whyChooseUs");

  const reasons = [
    t("items.senior"),
    t("items.communication"),
    t("items.execution"),
    t("items.flexibility")
  ];

  return (
    <AnimatedSection id="why-us">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
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
            viewport={{once: true, amount: 0.2}}
          >
            {reasons.map((reason, index) => (
              <motion.li
                key={reason}
                className="glass rounded-3xl p-6"
                variants={slideUp(index * 0.03)}
              >
                <span className="text-sm font-semibold text-sky-300">0{index + 1}</span>
                <p className="mt-4 text-base leading-7 text-slate-200">{reason}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </AnimatedSection>
  );
}
