export type TeamExperience = {
  period: string;
  title: string;
  company: string;
  employmentType?: string;
  duration?: string;
  location?: string;
  project?: string;
  description?: string;
  achievementSections?: Array<{
    title: string;
    items: string[];
  }>;
  impact: string[];
  skills?: string[];
};

export type TeamEducation = {
  period?: string;
  degree: string;
  institution: string;
  details?: string;
};

export type TeamExpertise = {
  title: string;
  description: string;
  tech: string[];
};

export type TeamFinalCta = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export type TeamMemberProfileData = {
  slug: string;
  name: string;
  imageSrc: string;
  role: string;
  tagline: string;
  intro: string;
  principles: string[];
  expertise: TeamExpertise[];
  experienceTimeline: TeamExperience[];
  education: TeamEducation[];
  finalCta: TeamFinalCta;
};
