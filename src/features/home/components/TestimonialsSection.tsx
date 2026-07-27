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
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const profileMeta = {
  andreea: {
    href: "/team/andreea",
    images: [
      {
        alt: "Andreea",
        imageClassName: "object-cover",
        imageSrc: "/images/andreea.jpg",
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
        imageSrc: "/images/georgian.jpg",
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
        imageSrc: "/images/georgian.jpg",
        wrapperClassName: "p-0",
      },
      {
        alt: "Andreea",
        imageClassName: "object-cover",
        imageSrc: "/images/andreea.jpg",
        wrapperClassName: "p-0",
      },
    ],
  },
} as const;

type SourceType = "linkedin" | "website" | "feedback";
type CarouselPosition = "left" | "center" | "right";
type SlideDirection = -1 | 1;

type Testimonial = {
  avatarSrc?: string;
  authorInitials: string;
  company: string;
  key: string;
  name: string;
  quote: string;
  recipient: keyof typeof profileMeta;
  readMoreHref?: string;
  reviewerHref?: string;
  role: string;
  source: string;
  sourceHref: string;
  sourceType: SourceType;
};

const testimonials: Testimonial[] = [
  {
    avatarSrc: "/images/reviewers/santiago.jpg",
    authorInitials: "SSG",
    company: "Siemens Energy",
    key: "georgian",
    name: "Santiago Sorribes Guigó",
    quote:
      "I had the pleasure of working with Georgian, an excellent UI Developer with a strong eye for detail and a clear understanding of how to translate design requirements into clean, usable, and responsive interfaces. Georgian consistently delivered high-quality work, communicated clearly with both technical and non-technical stakeholders, and showed a strong commitment to improving the user experience. Their ability to balance visual precision, usability, and technical implementation made them a valuable member of the team. Beyond the technical skills, Georgian brings a very positive attitude to every project and is a genuine team player, always willing to support colleagues and contribute to a collaborative working environment. I would gladly recommend Georgian to any organization looking for a reliable, skilled, and collaborative team member that will help delivering any project.",
    recipient: "georgian",
    readMoreHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/santiagosg/",
    role: "Product Manager",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/bjorn.jpg",
    authorInitials: "BK",
    company: "TKD Solutions",
    key: "andreea",
    name: "Björn Kunze",
    quote:
      "I worked with Andreea on a web platform project for about two years and always appreciated working with her. Andreea is a smart and higly skilled professional. She is reliable and is getting things done. In complex scenarios she keeps things in perspective. She is actively participating in meetings and gives very qualified and valuable feedback. She was also coaching juniors besides her own work to improve other team memebers. I very much enjoyed working with Andreea and would recommend her for any project.",
    recipient: "andreea",
    readMoreHref:
      "https://www.linkedin.com/in/andreea-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/bj%C3%B6rn-kunze-205ab4/",
    role: "CTO",
    source: "LinkedIn",
    sourceHref: "https://www.linkedin.com/in/andreea-orian/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/sylvain.jpg",
    authorInitials: "SL",
    company: "Flowie",
    key: "sylvain",
    name: "Sylvain Leray",
    quote:
      "I had the pleasure of working with Georgian Orian at Flowie, where he was a Senior Frontend Developer in my team. Georgian is one of those rare profiles who combines deep technical expertise with genuine integrity. He led the entire frontend scope related to payment, a critical and complex part of the product, with full autonomy and reliability. His work was rock-solid, and I always knew I could trust him to take ownership, ask the right questions, and deliver with quality. What stood out even more was his calm and professional attitude, even in challenging contexts. Whether it was navigating difficult backend integrations or moving across scopes with agility, Georgian always brought stability and focus. He also had a real talent for giving feedback clearly and respectfully, which made him a key contributor to the trust-based culture I wanted to build in the team. In short, Georgian is not just a strong developer. He’s someone you’re happy to have on your team, and even prouder to recommend.",
    recipient: "georgian",
    readMoreHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/sylvainleray",
    role: "Project Manager",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/cristina.jpg",
    authorInitials: "CM",
    company: "European Parliament",
    key: "cristina",
    name: "Cristina Mihailescu",
    quote:
      "I was impressed with Georgian's calm and and focus on solutions under any situation. Georgian is a dedicated professional, his expertise as a frontend developer is considerable and it helped our team come up with more efficient solutions on different projects. His ability to coach juniors and help others when needed were inspiring. I highly recommend Georgian and would love to work with him again.",
    recipient: "georgian",
    readMoreHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/cristina-mihailescu-18793b22/",
    role: "Head of Service",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/cristian.jpg",
    authorInitials: "CB",
    company: "dotWhite",
    key: "cristian",
    name: "Cristian Beje",
    quote:
      "From my experience working with him, I can say that Georgian is one of those rare people you can always trust to deliver quality code on time. He is one of the most dependable and independent software developers I have ever worked with. Always transparent, open and professional with both the team and the customers, Georgian is reliable and proactive. I’m glad we had Georgian working together with us, and I believe he would be a valuable asset to any company. Highly recommend working with Georgian if you get the chance!",
    recipient: "georgian",
    readMoreHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/cristianbeje/",
    role: "CEO",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/alina.jpg",
    authorInitials: "AC",
    company: "Globant",
    key: "alina",
    name: "Alina Chiorean",
    quote:
      "During our collaboration on different projects, Georgian proved a lot of proactivity, intellectual curiosity, engagement and professionalism. Results oriented and with a high sense of commitment towards delivering qualitative code, Georgian’s tech knowledge, motivation and way of being, rapidly stand out, making it a true pleasure to work with him.",
    recipient: "georgian",
    readMoreHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    reviewerHref: "https://www.linkedin.com/in/alina-chiorean-709b2b3/",
    role: "Country Manager",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
  {
    avatarSrc: "/images/reviewers/julia.jpg",
    authorInitials: "JH",
    company: "Flowie",
    key: "julia",
    name: "Julia Hudson",
    quote:
      "Georgian is always very empathetic and human-centric in his work. I loved working with him because he is focused on the human experience of using a product, beyond simply the technical challenges.",
    recipient: "georgian",
    reviewerHref: "https://www.linkedin.com/in/julia-h-105b0810/",
    role: "Product Owner",
    source: "LinkedIn",
    sourceHref:
      "https://www.linkedin.com/in/georgian-orian/details/recommendations/",
    sourceType: "linkedin",
  },
];

const cardTransition = {
  duration: 0.92,
  ease: [0.16, 1, 0.3, 1],
} as const;

const testimonialPreviewLength = 220;

function getOffsets(viewportWidth: number) {
  if (viewportWidth < 640) {
    return { edgeOffset: 400, sideOffset: 200 };
  }

  if (viewportWidth < 1024) {
    return { edgeOffset: 540, sideOffset: 270 };
  }

  return { edgeOffset: 680, sideOffset: 340 };
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

  useEffect(() => {
    const selectLinkedTestimonial = (event: Event) => {
      const testimonialKey = (event as CustomEvent<string>).detail;
      const testimonialIndex = testimonials.findIndex(
        (testimonial) => testimonial.key === testimonialKey,
      );

      if (testimonialIndex < 0) return;

      setActiveIndex((currentIndex) => {
        setDirection(getDirection(currentIndex, testimonialIndex));
        return testimonialIndex;
      });
    };

    window.addEventListener("select-testimonial", selectLinkedTestimonial);

    return () => {
      window.removeEventListener("select-testimonial", selectLinkedTestimonial);
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
  }> =
    viewportWidth < 1024
      ? [{ position: "center", testimonial: testimonials[activeIndex] }]
      : [
          { position: "left", testimonial: testimonials[prevIndex] },
          { position: "center", testimonial: testimonials[activeIndex] },
          { position: "right", testimonial: testimonials[nextIndex] },
        ];

  const renderCard = (testimonial: Testimonial, position: CarouselPosition) => {
    const isCenter = position === "center";
    const isLongQuote = testimonial.quote.length > testimonialPreviewLength;
    const displayedQuote = isLongQuote
      ? `${testimonial.quote
          .slice(0, testimonialPreviewLength)
          .replace(/\s+\S*$/, "")
          .trimEnd()}…`
      : testimonial.quote;

    const widthClassName = isCenter
      ? "w-[min(88vw,24rem)] sm:w-[min(70vw,26rem)] lg:w-[22rem] xl:w-[24rem]"
      : "w-[min(74vw,19rem)] sm:w-[min(40vw,20rem)] lg:w-[19rem] xl:w-[20rem]";

    const targetX = isCenter
      ? 0
      : position === "left"
        ? -sideOffset
        : sideOffset;

    const reviewerAvatar = (
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,6,23,0.2)]">
        {testimonial.avatarSrc ? (
          <Image
            alt={testimonial.name}
            className="object-cover object-top"
            fill
            sizes="44px"
            src={testimonial.avatarSrc}
          />
        ) : (
          testimonial.authorInitials
        )}
      </span>
    );

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
        drag={viewportWidth < 1024 && isCenter ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={(_, info) => {
          if (viewportWidth >= 1024 || !isCenter) return;

          if (info.offset.x <= -56) {
            goBy(1);
          }

          if (info.offset.x >= 56) {
            goBy(-1);
          }
        }}
        className={cn(
          "absolute left-1/2 top-0 will-change-transform",
          viewportWidth < 1024 && isCenter && "cursor-grab active:cursor-grabbing",
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
        <div
          aria-label={
            !isCenter ? `Focus testimonial from ${testimonial.name}` : undefined
          }
          className={cn(
            "group relative w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.72))] p-6 text-left shadow-[0_22px_55px_rgba(2,6,23,0.18)] transition-all duration-300 sm:p-7",
            isCenter ? "h-[27rem] sm:h-[28rem]" : "h-[24rem] sm:h-[25rem]",
            isCenter
              ? "cursor-default"
              : "cursor-pointer hover:shadow-[0_28px_70px_rgba(2,6,23,0.26)]",
          )}
          onClick={() =>
            !isCenter &&
            goTo(testimonials.findIndex((item) => item.key === testimonial.key))
          }
          onKeyDown={(event) => {
            if (!isCenter && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              goTo(
                testimonials.findIndex((item) => item.key === testimonial.key),
              );
            }
          }}
          role={!isCenter ? "button" : undefined}
          tabIndex={!isCenter ? 0 : undefined}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_38%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {testimonial.reviewerHref ? (
                  <a
                    aria-label={`View ${testimonial.name} on LinkedIn`}
                    className="rounded-full outline-none ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 focus-visible:ring-sky-300"
                    href={testimonial.reviewerHref}
                    onClick={(event) => event.stopPropagation()}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {reviewerAvatar}
                  </a>
                ) : (
                  reviewerAvatar
                )}
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
              <blockquote
                className={cn(
                  "max-w-[34rem] overflow-hidden text-[1.08rem] leading-7 text-slate-100 [display:-webkit-box] [-webkit-box-orient:vertical] sm:text-[1.14rem]",
                  isCenter
                    ? "[-webkit-line-clamp:5] sm:[-webkit-line-clamp:6]"
                    : "[-webkit-line-clamp:4]",
                )}
              >
                &ldquo;{displayedQuote}&rdquo;
              </blockquote>
              {isLongQuote && testimonial.readMoreHref ? (
                <a
                  className="mt-4 inline-flex items-center text-sm font-semibold text-sky-200 transition-colors hover:text-sky-100"
                  href={testimonial.readMoreHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  Read more{" "}
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </a>
              ) : null}
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
        </div>
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
              className="relative h-[29rem] overflow-hidden outline-none sm:h-[30rem] lg:h-[32rem]"
              onKeyDown={handleKeyDown}
              role="region"
              tabIndex={0}
            >
              <button
                aria-label="Previous testimonial"
                className="absolute left-2 top-[13.5rem] z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-slate-100 backdrop-blur transition-colors duration-200 hover:border-white/20 hover:bg-slate-900/80 max-[479px]:hidden sm:left-4 sm:top-[14rem]"
                onClick={() => goBy(-1)}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                aria-label="Next testimonial"
                className="absolute right-2 top-[13.5rem] z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-slate-100 backdrop-blur transition-colors duration-200 hover:border-white/20 hover:bg-slate-900/80 max-[479px]:hidden sm:right-4 sm:top-[14rem]"
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

            <div className="mt-4 flex items-center justify-center gap-2 lg:mt-0">
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
        </div>
      </Container>
    </AnimatedSection>
  );
}
