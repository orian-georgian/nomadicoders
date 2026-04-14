import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";

import {Container} from "../ui/Container";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-white/5 py-8">
      <Container className="flex flex-col gap-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-200">Nomadicoders</p>
          <p>{t("tagline")}</p>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/privacy">{t("privacy")}</Link>
          <Link href="/terms">{t("terms")}</Link>
          <a href="mailto:hello@nomadicoders.dev">{t("email")}</a>
        </div>
      </Container>
    </footer>
  );
}
