import {ArrowUpRight, CalendarDays, Mail} from "lucide-react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";

import {Container} from "../ui/Container";

const footerNavigation = [
  {href: "/#services", key: "services"},
  {href: "/#projects", key: "work"},
  {href: "/#workflow-section", key: "process"},
  {href: "/#team-section", key: "team"},
] as const;

const capabilities = ["websites", "webApps", "mvps", "aiFeatures"] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-background">
      <Container className="relative py-12 sm:py-14">
        <div className="grid gap-10 border-b border-white/[0.08] pb-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_0.8fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Link
              aria-label="Nomadicoders home"
              className="inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.03em] text-white"
              href="/"
            >
              Nomadicoders
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">{t("tagline")}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-1.5 text-emerald-200/85">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                {t("availability")}
              </span>
              <span>{t("location")}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t("navigation.title")}
            </p>
            <nav className="mt-4 grid gap-3" aria-label={t("navigation.title")}>
              {footerNavigation.map((item) => (
                <Link
                  className="w-fit text-sm text-slate-300 transition-colors hover:text-sky-200"
                  href={item.href}
                  key={item.key}
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t("capabilities.title")}
            </p>
            <ul className="mt-4 grid gap-3">
              {capabilities.map((capability) => (
                <li className="text-sm text-slate-300" key={capability}>
                  {t(`capabilities.${capability}`)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t("contact.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">{t("contact.description")}</p>
            <div className="mt-4 grid gap-2">
              <a
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm text-slate-200 transition-colors hover:border-sky-300/20 hover:bg-sky-300/[0.05]"
                href="mailto:hello@nomadicoders.dev"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-sky-300" />
                  <span className="truncate">hello@nomadicoders.dev</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-200" />
              </a>
              <a
                className="group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/[0.025] hover:text-white"
                href="https://cal.com/nomadicoders"
              >
                <span className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 text-slate-500 group-hover:text-sky-300" />
                  {t("contact.call")}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", {year: currentYear})}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{t("deliveryNote")}</span>
            <Link className="transition-colors hover:text-slate-300" href="/privacy">
              {t("privacy")}
            </Link>
            <Link className="transition-colors hover:text-slate-300" href="/terms">
              {t("terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
