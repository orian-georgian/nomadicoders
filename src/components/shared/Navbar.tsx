import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { buttonVariants } from "../ui/Button";
import { Container } from "../ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/#services", key: "services" },
  { href: "/#why-us", key: "whyUs" },
  { href: "/#projects", key: "projects" },
  { href: "/#contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          aria-label="Nomadicoders home"
          className="text-xl font-semibold tracking-tight text-white"
          href="/"
        >
          Nomadicoders
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              className="text-sm text-slate-300 hover:text-white"
              href={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link className={buttonVariants({ size: "md" })} href="/#contact">
            {t("cta")}
          </Link>
        </div>
      </Container>
    </header>
  );
}
