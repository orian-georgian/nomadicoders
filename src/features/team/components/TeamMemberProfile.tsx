"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";

import { CTA } from "@/components/shared/CTA";
import { EducationSection } from "@/features/team/components/sections/EducationSection";
import { ExperienceTimeline } from "@/features/team/components/sections/ExperienceTimeline";
import { ExpertiseSection } from "@/features/team/components/sections/ExpertiseSection";
import { HeroSection } from "@/features/team/components/sections/HeroSection";
import { PrinciplesSection } from "@/features/team/components/sections/PrinciplesSection";
import {
  TeamMemberGrowthTimeline,
  type TimelinePoint,
} from "@/features/team/components/TeamMemberGrowthTimeline";
import type { TeamMemberProfileData } from "@/features/team/types/profile";

type TeamMemberProfileProps = {
  profile: TeamMemberProfileData;
};

function getStartYear(period: string) {
  const year = period.match(/\b(19|20)\d{2}\b/)?.[0];

  return year ? Number(year) : null;
}

function buildGrowthTimeline(profile: TeamMemberProfileData): TimelinePoint[] {
  const chronologicalExperience = [...profile.experienceTimeline]
    .map((experience) => ({
      experience,
      year: getStartYear(experience.period),
    }))
    .filter(
      (
        item,
      ): item is {
        experience: TeamMemberProfileData["experienceTimeline"][number];
        year: number;
      } => item.year !== null,
    )
    .sort((first, second) => first.year - second.year);

  const allSkills = new Set(
    chronologicalExperience.flatMap(({ experience }) => experience.skills ?? []),
  );
  const totalSkillCount = Math.max(allSkills.size, 1);
  const accumulatedSkills = new Set<string>();
  const totalPoints = Math.max(chronologicalExperience.length - 1, 1);

  return chronologicalExperience.map(({ experience, year }, index) => {
    (experience.skills ?? []).forEach((skill) => accumulatedSkills.add(skill));

    return {
      year,
      experienceLevel: Math.round(28 + (index / totalPoints) * 68),
      skillScore: Math.round((accumulatedSkills.size / totalSkillCount) * 100),
      label: experience.title,
      details:
        experience.project ??
        experience.impact[0] ??
        `${experience.company} - ${experience.period}`,
    };
  });
}

export function TeamMemberProfile({ profile }: TeamMemberProfileProps) {
  const growthTimeline = useMemo(() => buildGrowthTimeline(profile), [profile]);
  const firstName = profile.name.split(" ")[0] ?? profile.name;

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.08),transparent_30%)]"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl flex-col space-y-24 px-4 py-16 sm:space-y-28 sm:px-6 sm:py-20 lg:space-y-32 lg:px-8 lg:py-24">
        <HeroSection profile={profile} />
        <PrinciplesSection profile={profile} />
        <ExpertiseSection profile={profile} />
        <TeamMemberGrowthTimeline
          data={growthTimeline}
          height={380}
          title={`${firstName}'s Growth Timeline`}
        />
        <ExperienceTimeline profile={profile} />
        <EducationSection profile={profile} />
        <CTA
          buttonHref={profile.finalCta.actionHref}
          buttonLabel={profile.finalCta.actionLabel}
          contacts={[
            {
              actionLabel: "Open",
              href: "https://cal.com/nomadicoders",
              label: "Discovery call",
              value: "Book a focused project call",
            },
          ]}
          description={profile.finalCta.description}
          eyebrow="Work With Us"
          headingId="team-member-final-cta"
          title={profile.finalCta.title}
        />
      </div>
    </motion.main>
  );
}
