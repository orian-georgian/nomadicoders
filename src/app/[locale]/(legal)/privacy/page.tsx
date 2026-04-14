import {getTranslations} from "next-intl/server";

import {Container} from "@/components/ui/Container";
import {Section} from "@/components/ui/Section";

export default async function PrivacyPage() {
  const t = await getTranslations("Legal.privacy");

  return (
    <Section>
      <Container className="max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          {t("eyebrow")}
        </p>
        <h1 className="heading text-3xl sm:text-4xl">{t("title")}</h1>
        <p className="subheading">{t("intro")}</p>
        <div className="space-y-4 text-sm leading-7 text-slate-300">
          <p>{t("collection")}</p>
          <p>{t("usage")}</p>
          <p>{t("retention")}</p>
        </div>
      </Container>
    </Section>
  );
}
