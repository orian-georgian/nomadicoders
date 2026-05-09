"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { TeamMemberProfileSectionProps } from "./types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PrinciplesSection({ profile }: TeamMemberProfileSectionProps) {
  return (
    <section aria-labelledby="team-member-principles" className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <h2
          className="heading text-3xl sm:text-4xl"
          id="team-member-principles"
        >
          Core Principles
        </h2>
        <p className="subheading">
          How I approach every project, from early product decisions and
          architecture trade-offs to the everyday engineering habits that keep
          delivery clear, maintainable, and reliable.
        </p>
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        {profile.principles.map((principle) => (
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all duration-300 hover:border-sky-400/30 hover:bg-gradient-to-br hover:from-white/[0.07] hover:to-white/[0.02] hover:shadow-[0_8px_32px_rgba(56,189,248,0.08)]"
            key={principle}
            variants={itemVariants}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/0 via-sky-400/0 to-violet-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-sky-300" />
              </div>
              <p className="text-base font-medium leading-7 text-slate-200">
                {principle}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
