import type {Metadata} from "next";
import type {ReactNode} from "react";

import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {routing, type Locale} from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {locale: string};
};

const siteUrl = "https://nomadicoders.dev";

const metadataByLocale: Record<Locale, {title: string; description: string}> = {
  en: {
    title: "Nomadicoders | Senior Developers for Modern Web Products",
    description:
      "Nomadicoders is a two-person senior development team building high-performance web apps and websites with speed, clarity and remote-first execution."
  },
  ro: {
    title: "Nomadicoders | Dezvoltatori seniori pentru produse web moderne",
    description:
      "Nomadicoders este o echipă formată din doi dezvoltatori seniori care construiesc aplicații web și site-uri rapide, scalabile și fiabile."
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const {locale} = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const copy = metadataByLocale[locale as Locale];

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
      url: `${siteUrl}/${locale}`,
      siteName: "Nomadicoders"
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description
    },
    alternates: {
      languages: {
        en: "/en",
        ro: "/ro"
      }
    }
  };
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const messages = await getMessages({locale: locale as Locale});

  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>;
}
