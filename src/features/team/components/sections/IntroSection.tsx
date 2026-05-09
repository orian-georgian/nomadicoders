import type { TeamMemberProfileSectionProps } from "./types";

export function IntroSection({ profile }: TeamMemberProfileSectionProps) {
  return (
    <section
      aria-labelledby="team-member-intro"
      className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
    >
      <h2 className="text-2xl font-semibold text-white" id="team-member-intro">
        Introduction
      </h2>
      <p className="leading-8 text-slate-300">{profile.intro}</p>
    </section>
  );
}
