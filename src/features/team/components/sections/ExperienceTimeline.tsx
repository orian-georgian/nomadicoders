"use client";

import { useState } from "react";

import { Activity, Building2, ChevronDown, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import type { TeamExperience } from "@/features/team/types/profile";

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

function getTimelineOverlapClass({
  index,
  previousExperience,
  side,
}: {
  index: number;
  previousExperience?: TeamExperience;
  side: TimelineSide;
}) {
  if (index === 0) {
    return "";
  }

  if (side === "right") {
    return previousExperience?.achievementSections
      ? "md:-mt-[22rem] lg:-mt-[24rem]"
      : "md:-mt-28 lg:-mt-32";
  }

  return "md:-mt-12 lg:-mt-16";
}

function CompanyMark({ company }: { company: string }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#0B0F19]/90 text-cyan-100 shadow-[0_14px_38px_rgba(2,6,23,0.36)] backdrop-blur-xl">
      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(103,232,249,0.22),transparent_62%)]" />
      <span className="absolute -inset-1 rounded-[1.2rem] border border-cyan-300/10" />
      <Building2 aria-hidden="true" className="relative" size={20} />
      <span className="sr-only">{company}</span>
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

function ExperienceItem({
  experience,
  index,
  previousExperience,
}: {
  experience: TeamExperience;
  index: number;
  previousExperience?: TeamExperience;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const side: TimelineSide = index % 2 === 0 ? "left" : "right";
  const hasLongDescription = (experience.description?.length ?? 0) > 220;
  const skills = experience.skills ?? [];
  const highlightedSkills = skills.slice(0, 8);
  const companyLine = experience.employmentType
    ? `${experience.company} - ${experience.employmentType}`
    : experience.company;
  const overlapClass = getTimelineOverlapClass({
    index,
    previousExperience,
    side,
  });

  return (
    <motion.article
      className={`relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-0 ${overlapClass}`}
      custom={side}
      variants={itemVariants}
    >
      <TimelineConnector side={side} />

      <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
        <CompanyMark company={experience.company} />
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
                  <Activity aria-hidden="true" size={13} />
                  Signal {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {experience.title}
                </h3>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-slate-200">
                    {companyLine}
                  </p>
                  <p className="text-sm text-slate-500">
                    {experience.period}
                    {experience.duration ? ` - ${experience.duration}` : ""}
                  </p>
                  {experience.location ? (
                    <p className="text-sm text-slate-500">
                      {experience.location}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/15 bg-violet-300/10 text-violet-100 shadow-[0_0_30px_rgba(167,139,250,0.12)] sm:flex">
                <Sparkles aria-hidden="true" size={18} />
              </div>
            </div>

            {experience.project ? (
              <p className="mt-5 rounded-2xl border border-cyan-200/10 bg-cyan-300/5 px-4 py-3 text-sm font-semibold leading-6 text-cyan-100">
                {experience.project}
              </p>
            ) : null}

            {experience.description ? (
              <div className="mt-4">
                <p
                  className={`text-sm leading-7 text-slate-300 ${
                    !isExpanded && hasLongDescription ? "line-clamp-4" : ""
                  }`}
                >
                  {experience.description}
                </p>
                {hasLongDescription ? (
                  <button
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-cyan-100 transition hover:text-white"
                    onClick={() => setIsExpanded((value) => !value)}
                    type="button"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                    <ChevronDown
                      aria-hidden="true"
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      size={15}
                    />
                  </button>
                ) : null}
              </div>
            ) : null}

            {experience.impact.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Impact metrics
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {experience.impact.slice(0, 4).map((item) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-3 text-sm font-medium leading-6 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      key={item}
                    >
                      <span className="mr-2 text-cyan-200">+</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {experience.achievementSections ? (
              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Execution details
                </p>
                {experience.achievementSections.map((section) => (
                  <div key={section.title}>
                    <p className="text-sm font-semibold text-white">
                      {section.title}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {section.items.map((item) => (
                        <li
                          className="flex gap-2.5 text-sm leading-6 text-slate-300"
                          key={item}
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.55)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            {highlightedSkills.length > 0 ? (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Technology stack
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlightedSkills.map((skill) => (
                    <span
                      className="rounded-full border border-cyan-200/15 bg-cyan-300/[0.055] px-3 py-1.5 text-xs font-medium text-cyan-50 transition-colors duration-300 group-hover/card:border-cyan-200/25"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                  {skills.length > highlightedSkills.length ? (
                    <span className="rounded-full border border-violet-200/15 bg-violet-300/[0.06] px-3 py-1.5 text-xs font-medium text-violet-100">
                      +{skills.length - highlightedSkills.length} more
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function ExperienceTimeline({ profile }: TeamMemberProfileSectionProps) {
  return (
    <section
      aria-labelledby="team-member-experience"
      className="relative isolate overflow-hidden py-4"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(103,232,249,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.03)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      <div className="mb-12 max-w-3xl space-y-4">
        <h2
          className="heading text-3xl sm:text-4xl"
          id="team-member-experience"
        >
          Experience
        </h2>
        <p className="subheading">
          Career history, project context, measurable outcomes, production
          responsibilities, technical decisions, collaboration patterns, and the
          technologies used to ship reliable systems.
        </p>
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.08 }}
        whileInView="visible"
      >
        <div className="absolute bottom-8 left-6 top-0 w-px -translate-x-1/2 overflow-hidden md:left-1/2">
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {profile.experienceTimeline.map((experience, index) => (
          <ExperienceItem
            experience={experience}
            index={index}
            key={`${experience.company}-${experience.period}`}
            previousExperience={profile.experienceTimeline[index - 1]}
          />
        ))}
      </motion.div>
    </section>
  );
}
