import Image from "next/image";

import type { TeamMemberProfileData } from "@/features/team/types/profile";

type ProfessionalSnapshotGraphProps = {
  profile: TeamMemberProfileData;
};

export function ProfessionalSnapshotGraph({
  profile,
}: ProfessionalSnapshotGraphProps) {
  return (
    <aside
      aria-label={`${profile.name} professional snapshot`}
      className="mx-auto w-full max-w-[18.5rem] lg:max-w-[20rem]"
    >
      <div className="space-y-6">
        <div className="relative aspect-[4/5] min-h-[13.5rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900 shadow-[0_24px_70px_rgba(2,6,23,0.34)] sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            alt={profile.name}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 640px) 74vw, (max-width: 1280px) 24vw, 320px"
            src={profile.imageSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.18))]" />

          <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100 backdrop-blur-md">
              Available
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
