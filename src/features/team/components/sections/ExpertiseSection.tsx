"use client";

import { motion } from "framer-motion";

import type { TeamMemberProfileSectionProps } from "./types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ExpertiseSection({ profile }: TeamMemberProfileSectionProps) {
  return (
    <section aria-labelledby="team-member-expertise" className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <h2
          className="heading text-3xl sm:text-4xl"
          id="team-member-expertise"
        >
          Areas of Expertise
        </h2>
        <p className="subheading">
          Specialized knowledge across key technical domains
        </p>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.15 }}
        whileInView="visible"
      >
        {profile.expertise.map((area) => (
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all duration-300 hover:border-sky-400/30 hover:bg-gradient-to-br hover:from-white/[0.07] hover:to-white/[0.02] hover:shadow-[0_8px_32px_rgba(56,189,248,0.08)]"
            key={area.title}
            variants={itemVariants}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/0 via-sky-400/0 to-violet-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {area.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {area.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {area.tech.map((tech) => (
                  <span
                    className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-100"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
