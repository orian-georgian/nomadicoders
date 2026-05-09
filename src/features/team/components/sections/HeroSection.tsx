"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BuildVelocityCardContent } from "@/components/shared/hero/BuildVelocityCardContent";
import { HeroMetricCard } from "@/components/shared/hero/HeroMetricCard";
import { buttonVariants } from "@/components/ui/Button";
import { ProfessionalSnapshotGraph } from "@/features/team/components/ProfessionalSnapshotGraph";

import type { TeamMemberProfileSectionProps } from "./types";

function AnimatedMetricProgress({
  delay = 0,
  width = "74%",
}: {
  delay?: number;
  width?: string;
}) {
  return (
    <div className="mt-2 h-2 rounded-full bg-white/5">
      <motion.div
        animate={{ width: ["20%", "86%", width] }}
        className="h-2 rounded-full bg-brand-gradient"
        transition={{
          duration: 5.6,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function HeroSection({ profile }: TeamMemberProfileSectionProps) {
  const profileKpis = [
    {
      label: "Expertise",
      helper: "Core focus areas",
      value: `${profile.expertise.length}`,
      progressWidth: "74%",
    },
    {
      label: "Experience",
      helper: "Career stages",
      value: `${profile.experienceTimeline.length}+`,
      yearsExperience: "12+",
      progressWidth: "74%",
    },
    {
      label: "Principles",
      helper: "Guiding standards",
      value: `${profile.principles.length}`,
      progressWidth: "74%",
    },
  ];

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby="team-member-hero"
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-center xl:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1
              className="heading max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]"
              id="team-member-hero"
            >
              {profile.name}
            </h1>
            <p className="subheading max-w-2xl text-slate-200">
              {profile.role}. {profile.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {profileKpis.map((item) => (
            <HeroMetricCard
              animatedTopBorder
              key={item.label}
              className="bg-slate-950/70 shadow-[0_20px_80px_rgba(2,6,23,0.32)]"
              title={item.label}
            >
              {item.label === "Expertise" ? (
                <BuildVelocityCardContent
                  description={item.helper}
                  value={item.value}
                />
              ) : (
                <div className="space-y-4">
                  {item.label === "Experience" && item.yearsExperience ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-300">
                            Career stages
                          </span>
                          <span className="text-lg font-semibold tabular-nums text-white">
                            {item.value}
                          </span>
                        </div>
                        <AnimatedMetricProgress delay={0.1} />
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-300">
                            Years of experience
                          </span>
                          <span className="text-lg font-semibold tabular-nums text-white">
                            {item.yearsExperience}
                          </span>
                        </div>
                        <AnimatedMetricProgress delay={0.55} width="78%" />
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-slate-300">
                          {item.helper}
                        </span>
                        <span className="text-lg font-semibold tabular-nums text-white">
                          {item.value}
                        </span>
                      </div>
                      <AnimatedMetricProgress
                        delay={item.label === "Expertise" ? 0 : 0.25}
                        width={item.progressWidth}
                      />
                    </div>
                  )}
                </div>
              )}
            </HeroMetricCard>
          ))}
        </div>

        <p className="max-w-2xl text-base leading-7 text-slate-400">
          {profile.intro}
        </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link className={buttonVariants({ size: "lg" })} href="/#contact">
              Start a project
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "secondary" })}
              href="#team-member-experience"
            >
              View Experience
            </Link>
            <p className="text-sm text-slate-400">
              Usually responds within 24 hours.
            </p>
          </div>
        </div>

        <ProfessionalSnapshotGraph profile={profile} />
      </div>
    </motion.section>
  );
}
