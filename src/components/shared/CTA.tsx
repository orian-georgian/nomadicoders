"use client";

import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

type CTAContact = {
  actionLabel: string;
  href: string;
  label: string;
  value: string;
};

type CTAProps = {
  buttonLabel: string;
  buttonHref: string;
  className?: string;
  contacts?: CTAContact[];
  contained?: boolean;
  description: string;
  eyebrow: string;
  headingId?: string;
  sectionId?: string;
  title: string;
};

export function CTA({
  buttonLabel,
  buttonHref,
  className,
  contacts = [],
  contained = false,
  description,
  eyebrow,
  headingId,
  sectionId,
  title,
}: CTAProps) {
  const content = (
    <motion.div
      className="py-4"
      initial="hidden"
      variants={staggerContainer(0.14, 0.04)}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="visible"
    >
      <motion.div
        className="mx-auto max-w-2xl space-y-5 text-center"
        variants={fadeIn()}
      >
        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          {eyebrow}
        </span>
        <h2 className="heading text-3xl sm:text-4xl" id={headingId}>
          {title}
        </h2>
        <p className="subheading">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a className={buttonVariants({ size: "lg" })} href={buttonHref}>
            {buttonLabel}
          </a>
          {contacts.map((contact) => (
            <a
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
              })}
              href={contact.href}
              key={`${contact.label}-${contact.href}`}
            >
              {contact.value}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      aria-labelledby={headingId}
      className={cn(contained ? "section" : "relative isolate py-4", className)}
      id={sectionId}
    >
      {contained ? <Container>{content}</Container> : content}
    </section>
  );
}
