import { redirect } from "next/navigation";

import { routing } from "@/i18n/routing";

type TeamSlugRedirectPageProps = {
  params: {
    slug: string;
  };
};

export default function TeamSlugRedirectPage({
  params,
}: TeamSlugRedirectPageProps) {
  redirect(`/${routing.defaultLocale}/team/${params.slug}`);
}
