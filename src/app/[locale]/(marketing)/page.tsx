import {getTranslations} from "next-intl/server";

import {CTA} from "@/components/shared/CTA";
import {Hero} from "@/features/home/components/Hero";
import {ProjectsPreview} from "@/features/home/components/ProjectsPreview";
import {RefactorExperience} from "@/features/home/components/RefactorExperience";
import {Services} from "@/features/home/components/Services";
import {TeamSection} from "@/features/home/components/TeamSection";
import {TestimonialsSection} from "@/features/home/components/TestimonialsSection";
import {UIFixExperience} from "@/features/home/components/UIFixExperience";
import {WorkflowSection} from "@/features/home/components/WorkflowSection";
import {WhyChooseUs} from "@/features/home/components/WhyChooseUs";

export default async function MarketingHomePage() {
  const cta = await getTranslations("Home.cta");

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Services />
      <RefactorExperience />
      <UIFixExperience />
      <WorkflowSection />
      <TestimonialsSection />
      <TeamSection />
      <ProjectsPreview />
      <CTA
        buttonHref="mailto:hello@nomadicoders.dev"
        buttonLabel={cta("button")}
        className="pt-0"
        contained
        contacts={[
          {
            actionLabel: cta("contact.openLabel"),
            href: "https://cal.com/nomadicoders",
            label: cta("contact.callLabel"),
            value: cta("contact.callValue"),
          },
        ]}
        description={cta("description")}
        eyebrow={cta("eyebrow")}
        sectionId="contact"
        title={cta("title")}
      />
    </>
  );
}
