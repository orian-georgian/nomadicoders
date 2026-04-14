import {CTA} from "@/features/home/components/CTA";
import {Hero} from "@/features/home/components/Hero";
import {Problem} from "@/features/home/components/Problem";
import {ProjectsPreview} from "@/features/home/components/ProjectsPreview";
import {RefactorExperience} from "@/features/home/components/RefactorExperience";
import {Services} from "@/features/home/components/Services";
import {TeamSection} from "@/features/home/components/TeamSection";
import {TestimonialsSection} from "@/features/home/components/TestimonialsSection";
import {UIFixExperience} from "@/features/home/components/UIFixExperience";
import {WorkflowSection} from "@/features/home/components/WorkflowSection";
import {WhyChooseUs} from "@/features/home/components/WhyChooseUs";

export default function MarketingHomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <RefactorExperience />
      <UIFixExperience />
      <WorkflowSection />
      <TestimonialsSection />
      <TeamSection />
      <WhyChooseUs />
      <ProjectsPreview />
      <CTA />
    </>
  );
}
