"use client";

import { useState } from "react";

import { Menu, MoveRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { buttonVariants } from "../ui/Button";
import { Container } from "../ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/#services", key: "services" },
  { href: "/#why-us", key: "whyUs" },
  { href: "/#projects", key: "portfolio" },
  { href: "/#team-section", key: "team" },
  { href: "/#contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-background/90 backdrop-blur-xl">
      <Container className="relative flex h-20 items-center gap-4">
        <Link
          aria-label="Nomadicoders home"
          className="inline-flex w-fit items-center gap-2 text-lg font-semibold tracking-[-0.03em] text-white"
          href="/"
        >
          Nomadicoders
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              className="relative px-3 py-2 text-[0.82rem] font-medium text-slate-400 transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-purple after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100"
              href={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            className={buttonVariants({
              className: "group hidden items-center gap-2 px-4 lg:inline-flex",
              size: "md",
            })}
            href="/#contact"
          >
            {t("cta")}
            <MoveRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-100 transition-colors hover:bg-white/[0.08] lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {isMenuOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-white/[0.07] bg-background shadow-[0_24px_48px_rgba(2,6,23,0.28)] lg:hidden" id="mobile-navigation">
          <Container className="py-4">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                  href={item.href}
                  key={item.key}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
