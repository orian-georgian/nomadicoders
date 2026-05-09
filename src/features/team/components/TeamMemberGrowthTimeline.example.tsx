"use client";

import {
  TeamMemberGrowthTimeline,
  type TimelinePoint,
} from "@/features/team/components/TeamMemberGrowthTimeline";

const mockGrowthData: TimelinePoint[] = [
  {
    year: 2013,
    experienceLevel: 18,
    skillScore: 22,
    label: "First production role",
    details: "Started shipping client-facing interfaces and learning delivery fundamentals.",
  },
  {
    year: 2016,
    experienceLevel: 38,
    skillScore: 44,
    label: "Frontend specialization",
    details: "Moved deeper into React architecture, component systems, and UX quality.",
  },
  {
    year: 2019,
    experienceLevel: 62,
    skillScore: 68,
    label: "Platform ownership",
    details: "Owned larger production surfaces, performance budgets, and release quality.",
  },
  {
    year: 2022,
    experienceLevel: 78,
    skillScore: 84,
    label: "Technical leadership",
    details: "Led migrations, mentored developers, and shaped frontend standards.",
  },
  {
    year: 2025,
    experienceLevel: 92,
    skillScore: 96,
    label: "Senior product engineering",
    details: "Combined architecture, product thinking, and reliable execution at scale.",
  },
];

export function TeamMemberGrowthTimelineExample() {
  return (
    <TeamMemberGrowthTimeline
      data={mockGrowthData}
      height={380}
      theme="dark"
      title="Professional Growth"
    />
  );
}
