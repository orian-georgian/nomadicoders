"use client";

import {useTransition} from "react";

import {useLocale, useTranslations} from "next-intl";

import {routing, type Locale} from "@/i18n/routing";
import {usePathname, useRouter} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <div
      aria-label={t("language")}
      className="glass inline-flex h-11 items-center rounded-full p-1 text-xs font-medium text-slate-200"
      role="group"
    >
      {routing.locales.map((option) => (
        <button
          key={option}
          className={cn(
            "h-9 rounded-full px-3 uppercase transition-colors",
            locale === option
              ? "bg-white text-slate-950"
              : "text-slate-300 hover:text-white",
            isPending && "pointer-events-none opacity-70"
          )}
          onClick={() => handleLocaleChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
