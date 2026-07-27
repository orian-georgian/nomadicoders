export type ProjectKey = "saas" | "booking" | "marketing" | "operations";

export type Project = {
  clientImageSrc: string;
  key: ProjectKey;
  stack: string[];
  team: Array<"Andreea" | "Georgian">;
  testimonialKey: string;
};

export const projects: Project[] = [
  {
    clientImageSrc: "/images/companies/siemens-energy.jpg",
    key: "saas",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    team: ["Andreea", "Georgian"],
    testimonialKey: "georgian",
  },
  {
    clientImageSrc: "/images/companies/adobe.jpg",
    key: "booking",
    stack: ["React", "Mobile UX", "CMS"],
    team: ["Andreea", "Georgian"],
    testimonialKey: "andreea",
  },
  {
    clientImageSrc: "/images/companies/dotwhite.jpg",
    key: "marketing",
    stack: ["Next.js", "Performance", "SEO"],
    team: ["Georgian"],
    testimonialKey: "sylvain",
  },
  {
    clientImageSrc: "/images/companies/fujitsu.jpg",
    key: "operations",
    stack: ["TypeScript", "Automation", "APIs"],
    team: ["Andreea"],
    testimonialKey: "cristina",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.key === slug);
}
