import { TeamMemberProfile } from "@/features/team/components/TeamMemberProfile";
import {
  getTeamMemberBySlug,
  teamMembers,
} from "@/features/team/data/teamMembers";

type TeamMemberPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const member = getTeamMemberBySlug(params.slug);

  if (!member) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xl font-semibold text-white">Not Found</p>
      </main>
    );
  }

  return <TeamMemberProfile profile={member} />;
}
