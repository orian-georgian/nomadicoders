"use client";

import {useTranslations} from "next-intl";

import {AnimatedSection} from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import {Container} from "@/components/ui/Container";
import {ProjectCard} from "@/features/projects/components/ProjectCard";

export function ProjectsPreview() {
  const t = useTranslations("Home.projects");

  const projects = [
    {
      category: t("items.saas.category"),
      title: t("items.saas.title"),
      summary: t("items.saas.summary"),
      outcome: t("items.saas.outcome")
    },
    {
      category: t("items.booking.category"),
      title: t("items.booking.title"),
      summary: t("items.booking.summary"),
      outcome: t("items.booking.outcome")
    },
    {
      category: t("items.marketing.category"),
      title: t("items.marketing.title"),
      summary: t("items.marketing.summary"),
      outcome: t("items.marketing.outcome")
    }
  ];

  return (
    <AnimatedSection id="projects">
      <Container>
        <div className="max-w-3xl space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            {t("eyebrow")}
          </span>
          <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="subheading">{t("description")}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
