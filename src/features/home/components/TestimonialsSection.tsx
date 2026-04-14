"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const profileMeta = {
  andreea: {
    href: "/team/andreea",
    images: [
      {
        alt: "Andreea",
        imageClassName: "object-cover",
        imageSrc: "/images/andreea.jfif",
        wrapperClassName: "p-0",
      },
    ],
  },
  georgian: {
    href: "/team/georgian",
    images: [
      {
        alt: "Georgian",
        imageClassName: "object-cover",
        imageSrc: "/images/georgian.jfif",
        wrapperClassName: "p-0",
      },
    ],
  },
  nomadicoders: {
    href: "/team/nomadicoders",
    images: [
      {
        alt: "Georgian",
        imageClassName: "object-cover",
        imageSrc: "/images/georgian.jfif",
        wrapperClassName: "p-0",
      },
      {
        alt: "Andreea",
        imageClassName: "object-cover",
        imageSrc: "/images/andreea.jfif",
        wrapperClassName: "p-0",
      },
    ],
  },
} as const;

type SourceType = "linkedin" | "website" | "feedback";
type CarouselPosition = "left" | "center" | "right";
type SlideDirection = -1 | 1;

type Testimonial = {
  authorInitials: string;
  company: string;
  key: string;
  name: string;
  quote: string;
  recipient: keyof typeof profileMeta;
  role: string;
  source: string;
  sourceHref: string;
  sourceType: SourceType;
};

const testimonials: Testimonial[] = [
  {
    authorInitials: "M",
    company: "Product Studio",
    key: "georgian",
    name: "Mihai",
    quote:
      "They don't just deliver features, they think through the entire product. The code quality and structure made a huge difference for our team.",
    recipient: "georgian",
    role: "Senior Engineer",
    source: "LinkedIn",
    sourceHref: "https://www.linkedin.com/",
    sourceType: "linkedin",
  },
  {
    authorInitials: "R",
    company: "HealthTech Platform",
    key: "andreea",
    name: "Raluca",
    quote:
      "Working with them brought clarity to our project. What used to feel complex became structured and predictable.",
    recipient: "andreea",
    role: "Product Manager",
    source: "Client feedback",
    sourceHref: "",
    sourceType: "feedback",
  },
  {
    authorInitials: "SF",
    company: "B2B SaaS Company",
    key: "startupFounder",
    name: "Startup Founder",
    quote:
      "Communication was clear, timelines were respected, and we always knew what was happening. That's rare.",
    recipient: "nomadicoders",
    role: "Founder",
    source: "Website",
    sourceHref: "",
    sourceType: "website",
  },
  {
    authorInitials: "SC",
    company: "Growth SaaS Platform",
    key: "saasClient",
    name: "SaaS Client",
    quote:
      "The improvements in performance and usability were immediately noticeable. Our product feels faster and easier to use.",
    recipient: "nomadicoders",
    role: "Product Team",
    source: "Client feedback",
    sourceHref: "",
    sourceType: "feedback",
  },
];

const cardTransition = {
  duration: 0.92,
  ease: [0.16, 1, 0.3, 1],
} as const;

function getOffsets(viewportWidth: number) {
  if (viewportWidth < 640) {
    return { edgeOffset: 390, sideOffset: 190 };
  }

  if (viewportWidth < 1024) {
    return { edgeOffset: 520, sideOffset: 250 };
  }

  return { edgeOffset: 650, sideOffset: 320 };
}

function LinkedInBadge() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.1 20.45H3.54V9H7.1v11.45Z" />
    </svg>
  );
}

function SourceIcon({ sourceType }: { sourceType: SourceType }) {
  if (sourceType === "linkedin") {
    return <LinkedInBadge />;
  }

  if (sourceType === "website") {
    return <Globe className="h-4 w-4" strokeWidth={1.8} />;
  }

  return <MessageSquareText className="h-4 w-4" strokeWidth={1.8} />;
}

function wrapIndex(index: number) {
  return (
    ((index % testimonials.length) + testimonials.length) % testimonials.length
  );
}

function getDirection(fromIndex: number, toIndex: number): SlideDirection {
  const forward =
    (toIndex - fromIndex + testimonials.length) % testimonials.length;
  const backward =
    (fromIndex - toIndex + testimonials.length) % testimonials.length;

  return forward <= backward ? 1 : -1;
}

function RecipientAvatars({
  recipientKey,
}: {
  recipientKey: keyof typeof profileMeta;
}) {
  const recipient = profileMeta[recipientKey];

  return (
    <Link
      className="inline-flex items-center gap-2 text-sm text-slate-100 transition-colors duration-200 hover:text-white"
      href={recipient.href}
    >
      {recipient.images.map((image, index) => (
        <span
          className={cn(
            "relative inline-flex h-11 w-11 overflow-hidden rounded-full border border-white/10 shadow-[0_10px_24px_rgba(2,6,23,0.16)]",
            image.wrapperClassName,
            index > 0 ? "-ml-4" : "",
          )}
          key={`${recipientKey}-${image.alt}`}
        >
          <Image
            alt={image.alt}
            className={cn("h-full w-full", image.imageClassName)}
            fill
            sizes="44px"
            src={image.imageSrc}
          />
        </span>
      ))}
    </Link>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("Home.testimonialsSection");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [viewportWidth, setViewportWidth] = useState(1280);

  useEffect(() => {
    const syncWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    syncWidth();
    window.addEventListener("resize", syncWidth);

    return () => {
      window.removeEventListener("resize", syncWidth);
    };
  }, []);

  const { edgeOffset, sideOffset } = getOffsets(viewportWidth);

  const prevIndex = wrapIndex(activeIndex - 1);
  const nextIndex = wrapIndex(activeIndex + 1);

  const goTo = (index: number) => {
    const wrappedIndex = wrapIndex(index);

    if (wrappedIndex === activeIndex) {
      return;
    }

    setDirection(getDirection(activeIndex, wrappedIndex));
    setActiveIndex(wrappedIndex);
  };

  const goBy = (step: SlideDirection) => {
    setDirection(step);
    setActiveIndex((currentIndex) => wrapIndex(currentIndex + step));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goBy(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goBy(-1);
    }
  };

  const visibleCards: Array<{
    position: CarouselPosition;
    testimonial: Testimonial;
  }> = [
    { position: "left", testimonial: testimonials[prevIndex] },
    { position: "center", testimonial: testimonials[activeIndex] },
    { position: "right", testimonial: testimonials[nextIndex] },
  ];

  const renderCard = (testimonial: Testimonial, position: CarouselPosition) => {
    const isCenter = position === "center";

    const widthClassName = isCenter
      ? "w-[min(88vw,24rem)] sm:w-[min(70vw,26rem)] lg:w-[22rem] xl:w-[24rem]"
      : "w-[min(72vw,18rem)] sm:w-[min(38vw,19rem)] lg:w-[18rem] xl:w-[19rem]";

    const targetX = isCenter
      ? 0
      : position === "left"
        ? -sideOffset
        : sideOffset;

    return (
      <motion.article
        key={testimonial.key}
        animate={{
          filter: isCenter ? "blur(0px)" : "blur(4px)",
          opacity: isCenter ? 1 : 0.52,
          scale: isCenter ? 1 : 0.9,
          x: targetX,
          y: isCenter ? 0 : 16,
        }}
        className={cn(
          "absolute left-1/2 top-0 will-change-transform",
          isCenter ? "z-20" : "z-10",
          widthClassName,
        )}
        exit={{
          filter: "blur(14px)",
          opacity: 0,
          scale: 0.82,
          x: direction === 1 ? -edgeOffset : edgeOffset,
          y: 22,
        }}
        initial={{
          filter: "blur(14px)",
          opacity: 0,
          scale: 0.82,
          x: direction === 1 ? edgeOffset : -edgeOffset,
          y: 22,
        }}
        layout
        transformTemplate={({ x, y, scale }) => {
          const motionX = typeof x === "number" ? `${x}px` : (x ?? "0px");
          const motionY = typeof y === "number" ? `${y}px` : (y ?? "0px");
          const motionScale =
            typeof scale === "number" ? scale : Number(scale ?? 1);

          return `translateX(-50%) translateX(${motionX}) translateY(${motionY}) scale(${motionScale})`;
        }}
        transition={cardTransition}
      >
        <button
          aria-label={`Focus testimonial from ${testimonial.name}`}
          className={cn(
            "group relative h-[27rem] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.72))] p-6 text-left shadow-[0_22px_55px_rgba(2,6,23,0.18)] transition-all duration-300 sm:h-[28rem] sm:p-7",
            isCenter
              ? "cursor-default"
              : "cursor-pointer hover:shadow-[0_28px_70px_rgba(2,6,23,0.26)]",
          )}
          onClick={() =>
            !isCenter &&
            goTo(testimonials.findIndex((item) => item.key === testimonial.key))
          }
          type="button"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_38%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,6,23,0.2)]">
                  {testimonial.authorInitials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {testimonial.role}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {testimonial.sourceHref ? (
                <a
                  aria-label={testimonial.source}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sky-100 transition-colors duration-200 hover:border-sky-200/45 hover:bg-sky-300/18"
                  href={testimonial.sourceHref}
                  rel="noreferrer"
                  target="_blank"
                  title={testimonial.source}
                >
                  <SourceIcon sourceType={testimonial.sourceType} />
                </a>
              ) : (
                <span
                  aria-label={testimonial.source}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sky-100"
                  title={testimonial.source}
                >
                  <SourceIcon sourceType={testimonial.sourceType} />
                </span>
              )}
            </div>

            <div className="mt-8 flex-1">
              <blockquote className="max-w-[34rem] text-[1.08rem] leading-8 text-slate-100 sm:text-[1.14rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-8 border-t border-white/8 pt-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {t("recipientLabel")}
                </p>
                <RecipientAvatars recipientKey={testimonial.recipient} />
              </div>
            </div>
          </div>
        </button>
      </motion.article>
    );
  };

  return (
    <AnimatedSection
      className="relative overflow-hidden"
      id="testimonials-section"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-400/6 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-cyan-300/5 blur-3xl" />
      </div>

      <Container>
        <div className="relative">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.35, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
          </motion.div>

          <div className="mt-12">
            <div
              aria-label="Testimonials carousel"
              className="relative h-[32rem] overflow-hidden outline-none sm:h-[34rem] lg:h-[32rem]"
              onKeyDown={handleKeyDown}
              role="region"
              tabIndex={0}
            >
              <button
                aria-label="Previous testimonial"
                className="absolute left-2 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-slate-100 backdrop-blur transition-colors duration-200 hover:border-white/20 hover:bg-slate-900/80 sm:left-4"
                onClick={() => goBy(-1)}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                aria-label="Next testimonial"
                className="absolute right-2 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-slate-100 backdrop-blur transition-colors duration-200 hover:border-white/20 hover:bg-slate-900/80 sm:right-4"
                onClick={() => goBy(1)}
                type="button"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
              <div className="absolute inset-0 overflow-hidden">
                <div className="relative mx-auto h-full w-full max-w-[78rem]">
                  <AnimatePresence initial={false} mode="popLayout">
                    {visibleCards.map(({ position, testimonial }) =>
                      renderCard(testimonial, position),
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.key}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-8 bg-sky-300"
                      : "w-2.5 bg-white/20 hover:bg-white/35",
                  )}
                  onClick={() => goTo(index)}
                  type="button"
                />
              ))}
            </div>
          </div>

          <motion.div
            className="mt-12 flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.4, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
                {t("cta.title")}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                {t("cta.description")}
              </p>
            </div>

            <a
              className={buttonVariants({
                className: "px-6 shadow-[0_16px_45px_rgba(56,189,248,0.18)]",
                size: "lg",
              })}
              href="#contact"
            >
              {t("cta.button")}
            </a>
          </motion.div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
