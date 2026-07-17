import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";

const clients = [
  { file: "adobe.png", name: "Adobe" },
  { file: "arobs.png", name: "AROBS" },
  { file: "cegeka.png", name: "Cegeka" },
  { file: "european-parliament.png", name: "European Parliament" },
  { file: "flowie.png", name: "Flowie" },
  { file: "fujitsu.png", name: "Fujitsu" },
  { file: "globant.png", name: "Globant" },
  { file: "siemens_energy.png", name: "Siemens Energy" },
];

export function ClientLogos({ embedded = false }: { embedded?: boolean }) {
  const t = useTranslations("Home.clients");

  const content = (
    <>
      <Container>
        <div className="py-6 sm:py-7">
          <p className="text-center text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t("eyebrow")}
          </p>
          <div className="logo-marquee-viewport mt-8 overflow-hidden sm:mt-9">
            <div className="logo-marquee-track">
              {[false, true].map((isDuplicate) => (
                <div
                  aria-hidden={isDuplicate}
                  className="flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14"
                  key={String(isDuplicate)}
                >
                  {clients.map((client) => (
                    <div
                      className="relative h-6 w-[6.5rem] shrink-0 opacity-90 transition-opacity duration-200 hover:opacity-100 sm:h-7 sm:w-28"
                      key={`${isDuplicate}-${client.file}`}
                    >
                      <Image
                        alt={client.name}
                        className="object-contain brightness-0 invert"
                        fill
                        sizes="112px"
                        src={`/images/logos/${client.file}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );

  if (embedded) {
    return <div className="mt-12 pb-2 sm:mt-14">{content}</div>;
  }

  return (
    <section aria-label={t("label")} className="-mt-8 overflow-hidden pb-12 sm:-mt-12 sm:pb-16">
      {content}
    </section>
  );
}
