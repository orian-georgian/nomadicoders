"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

import {AnimatedSection} from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import {buttonVariants} from "@/components/ui/Button";
import {Container} from "@/components/ui/Container";
import {ContactCard} from "@/features/contact/components/ContactCard";
import {fadeIn, staggerContainer} from "@/lib/animations";

export function CTA() {
  const t = useTranslations("Home.cta");

  return (
    <AnimatedSection id="contact" className="pt-0">
      <Container>
        <motion.div
          className="glass rounded-[2rem] border-white/10 px-6 py-10 sm:px-10 lg:px-12"
          initial="hidden"
          variants={staggerContainer(0.14, 0.04)}
          whileInView="visible"
          viewport={{once: true, amount: 0.25}}
        >
          <motion.div className="max-w-2xl space-y-5" variants={fadeIn()}>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
            <a className={buttonVariants({size: "lg"})} href="mailto:hello@nomadicoders.dev">
              {t("button")}
            </a>
          </motion.div>

          <motion.div className="mt-8 grid gap-4 lg:grid-cols-2" variants={fadeIn(0.08)}>
            <ContactCard
              actionLabel={t("contact.openLabel")}
              href="mailto:hello@nomadicoders.dev"
              label={t("contact.emailLabel")}
              value="hello@nomadicoders.dev"
            />
            <ContactCard
              actionLabel={t("contact.openLabel")}
              href="https://cal.com/nomadicoders"
              label={t("contact.callLabel")}
              value={t("contact.callValue")}
            />
          </motion.div>
        </motion.div>
      </Container>
    </AnimatedSection>
  );
}
