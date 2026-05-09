"use client";

import { GraduationCap, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import type { TeamEducation } from "@/features/team/types/profile";

import type { TeamMemberProfileSectionProps } from "./types";

type TimelineSide = "left" | "right";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: (side: TimelineSide) => ({
    opacity: 0,
    x: side === "left" ? -42 : 42,
    y: 18,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function EducationMark({ institution }: { institution: string }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#0B0F19]/90 text-cyan-100 shadow-[0_14px_38px_rgba(2,6,23,0.36)] backdrop-blur-xl">
      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(103,232,249,0.22),transparent_62%)]" />
      <span className="absolute -inset-1 rounded-[1.2rem] border border-cyan-300/10" />
      <GraduationCap aria-hidden="true" className="relative" size={21} />
      <span className="sr-only">{institution}</span>
    </div>
  );
}

function TimelineConnector({ side }: { side: TimelineSide }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute left-6 top-6 z-0 h-px w-8 bg-white/10 md:hidden"
      />
      <span
        aria-hidden="true"
        className={`absolute top-6 z-0 hidden h-px md:block ${
          side === "left"
            ? "right-[calc(50%+1.5rem)] w-4 bg-gradient-to-l from-white/20 to-transparent"
            : "left-[calc(50%+1.5rem)] w-4 bg-gradient-to-r from-white/20 to-transparent"
        }`}
      />
    </>
  );
}

function EducationItem({
  education,
  index,
}: {
  education: TeamEducation;
  index: number;
}) {
  const side: TimelineSide = index % 2 === 0 ? "left" : "right";

  return (
    <motion.article
      className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-0"
      custom={side}
      variants={itemVariants}
    >
      <TimelineConnector side={side} />

      <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
        <EducationMark institution={education.institution} />
      </div>

      <div
        className={`col-start-2 row-start-1 min-w-0 pb-10 md:col-start-1 md:pr-4 ${
          side === "right" ? "md:col-start-3 md:pl-4 md:pr-0" : ""
        }`}
      >
        <motion.div
          className="group/card relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_16px_44px_rgba(2,6,23,0.22)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-cyan-200/35 hover:shadow-[0_18px_48px_rgba(103,232,249,0.08)] sm:p-6"
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          whileHover={{
            y: -3,
            rotateX: 1.2,
            rotateY: side === "left" ? -1.2 : 1.2,
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(103,232,249,0.12),transparent_32%,rgba(167,139,250,0.09))] opacity-55" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-cyan-200/20 transition-opacity duration-300 group-hover/card:opacity-100" />

          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-slate-950/40 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                  Education {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {education.degree}
                </h3>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-slate-200">
                    {education.institution}
                  </p>
                  {education.period ? (
                    <p className="text-sm text-slate-500">
                      {education.period}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/15 bg-violet-300/10 text-violet-100 shadow-[0_0_30px_rgba(167,139,250,0.12)] sm:flex">
                <Sparkles aria-hidden="true" size={18} />
              </div>
            </div>

            {education.details ? (
              <p className="mt-5 rounded-2xl border border-cyan-200/10 bg-cyan-300/5 px-4 py-3 text-sm font-semibold leading-6 text-cyan-100">
                {education.details}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function EducationSection({ profile }: TeamMemberProfileSectionProps) {
  return (
    <section
      aria-labelledby="team-member-education"
      className="relative isolate overflow-hidden py-4"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(103,232,249,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.03)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      <div className="max-w-3xl space-y-4">
        <h2
          className="heading text-3xl sm:text-4xl"
          id="team-member-education"
        >
          Education
        </h2>
        <p className="subheading">
          Academic background, foundational training, and areas of study that
          shaped the technical practice.
        </p>
      </div>

      <motion.div
        className="relative mx-auto mt-12 max-w-6xl"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.08 }}
        whileInView="visible"
      >
        <div className="absolute bottom-8 left-6 top-0 w-px -translate-x-1/2 overflow-hidden md:left-1/2">
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {profile.education.map((education, index) => (
          <EducationItem
            education={education}
            index={index}
            key={`${education.institution}-${education.degree}-${education.period ?? "n-a"}`}
          />
        ))}
      </motion.div>
    </section>
  );
}
