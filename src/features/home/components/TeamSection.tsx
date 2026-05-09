"use client";

import { useEffect, useRef, useState } from "react";

import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type TeamMember = {
  desktopOffsetClassName: string;
  floatingDuration: number;
  href: string;
  imageSrc: string;
  name: string;
  role: string;
  startsAbove: boolean;
  traits: string[];
};

type TechBadge = {
  alt: string;
  className: string;
  delay: number;
  duration: number;
  imageClassName?: string;
  imageSrc: string;
  sizeClassName: string;
  startsAbove: boolean;
};

const teamMembers: TeamMember[] = [
  {
    desktopOffsetClassName: "lg:translate-y-8",
    floatingDuration: 6.8,
    href: "/team/georgian",
    imageSrc: "/images/georgian.jfif",
    name: "Georgian",
    role: "Senior Frontend Engineer",
    startsAbove: true,
    traits: ["UX", "Interfaces", "Product Polish"],
  },
  {
    desktopOffsetClassName: "lg:-translate-y-6",
    floatingDuration: 7.4,
    href: "/team/andreea",
    imageSrc: "/images/andreea.jfif",
    name: "Andreea",
    role: "Senior Full-Stack Engineer",
    startsAbove: false,
    traits: ["Architecture", "Performance", "Scalability"],
  },
];

const techBadges: TechBadge[] = [
  {
    alt: "Angular",
    className: "left-[2%] top-[8%] hidden lg:block",
    delay: 0.03,
    duration: 6.5,
    imageSrc: "/images/techs/angular.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: true,
  },
  {
    alt: "React",
    className: "left-[4%] top-6 sm:left-[8%] sm:top-10 lg:left-[12%] lg:top-16",
    delay: 0.05,
    duration: 6.1,
    imageSrc: "/images/techs/react.png",
    sizeClassName: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
    startsAbove: true,
  },
  {
    alt: "Tailwind CSS",
    className: "left-[1%] top-[34%] hidden sm:block lg:left-[4%] lg:top-[42%]",
    delay: 0.12,
    duration: 6.8,
    imageSrc: "/images/techs/tailwind.png",
    sizeClassName: "sm:h-12 sm:w-12 lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "Git",
    className:
      "left-[7%] bottom-[24%] hidden md:block lg:left-[7%] lg:bottom-[28%]",
    delay: 0.15,
    duration: 6.6,
    imageSrc: "/images/techs/git.png",
    sizeClassName: "md:h-12 md:w-12 lg:h-14 lg:w-14",
    startsAbove: true,
  },
  {
    alt: "AWS",
    className:
      "left-[10%] bottom-[8%] sm:left-[14%] sm:bottom-[10%] lg:left-[14%] lg:bottom-[14%]",
    delay: 0.14,
    duration: 6.7,
    imageSrc: "/images/techs/aws.png",
    sizeClassName: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
    startsAbove: false,
  },
  {
    alt: "HTML",
    className: "left-[24%] bottom-[2%] hidden lg:block",
    delay: 0.19,
    duration: 7.1,
    imageSrc: "/images/techs/html.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "Node.js",
    className:
      "left-[24%] top-[-12%] hidden md:block lg:left-[30%] lg:top-[-8%]",
    delay: 0.18,
    duration: 7.1,
    imageSrc: "/images/techs/nodejs.png",
    sizeClassName: "md:h-14 md:w-14 lg:h-16 lg:w-16",
    startsAbove: true,
  },
  {
    alt: "Redux",
    className: "left-[40%] top-[-5%] hidden lg:block",
    delay: 0.22,
    duration: 6.9,
    imageSrc: "/images/techs/redux.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "TypeScript",
    className:
      "right-[34%] top-[-12%] hidden md:block lg:right-[34%] lg:top-[-8%]",
    delay: 0.24,
    duration: 7.3,
    imageSrc: "/images/techs/typescript.png",
    sizeClassName: "md:h-14 md:w-14 lg:h-16 lg:w-16",
    startsAbove: true,
  },
  {
    alt: ".NET",
    className:
      "right-[24%] top-[-6%] hidden md:block lg:right-[23%] lg:top-[-2%]",
    delay: 0.28,
    duration: 6.7,
    imageSrc: "/images/techs/net.png",
    sizeClassName: "md:h-12 md:w-12 lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "Docker",
    className:
      "right-[7%] top-4 sm:right-[10%] sm:top-8 lg:right-[10%] lg:top-14",
    delay: 0.08,
    duration: 6.4,
    imageSrc: "/images/techs/docker.png",
    sizeClassName: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
    startsAbove: false,
  },
  {
    alt: "Vue",
    className: "right-[1%] top-[18%] hidden lg:block",
    delay: 0.3,
    duration: 7.4,
    imageSrc: "/images/techs/vue.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: true,
  },
  {
    alt: "Figma",
    className:
      "right-[2%] top-[36%] hidden sm:block lg:right-[4%] lg:top-[44%]",
    delay: 0.2,
    duration: 7.6,
    imageSrc: "/images/techs/figma.png",
    sizeClassName: "sm:h-12 sm:w-12 lg:h-14 lg:w-14",
    startsAbove: true,
  },
  {
    alt: "Sass",
    className:
      "right-[6%] bottom-[24%] hidden md:block lg:right-[10%] lg:bottom-[29%]",
    delay: 0.33,
    duration: 6.8,
    imageSrc: "/images/techs/sass.png",
    sizeClassName: "md:h-12 md:w-12 lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "Azure",
    className:
      "right-[16%] bottom-[10%] sm:right-[18%] sm:bottom-[11%] lg:right-[18%] lg:bottom-[16%]",
    delay: 0.16,
    duration: 6.9,
    imageClassName: "scale-[0.82]",
    imageSrc: "/images/techs/azure.png",
    sizeClassName: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
    startsAbove: false,
  },
  {
    alt: "Material UI",
    className: "right-[28%] bottom-[3%] hidden lg:block",
    delay: 0.36,
    duration: 7.2,
    imageSrc: "/images/techs/materialui.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: true,
  },
  {
    alt: "MySQL",
    className: "left-[50%] bottom-0 hidden lg:block",
    delay: 0.39,
    duration: 7.5,
    imageClassName: "scale-[0.84]",
    imageSrc: "/images/techs/mySQL.png",
    sizeClassName: "lg:h-14 lg:w-14",
    startsAbove: false,
  },
  {
    alt: "MongoDB",
    className:
      "left-[30%] bottom-0 hidden md:block lg:left-[40%] lg:bottom-[2%]",
    delay: 0.26,
    duration: 7.2,
    imageSrc: "/images/techs/mongoDB.png",
    sizeClassName: "md:h-14 md:w-14 lg:h-16 lg:w-16",
    startsAbove: true,
  },
];

const revealTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
} as const;

const hoverTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
} as const;

function TeamMemberOrb({
  delay,
  member,
  reducedMotion,
}: {
  delay: number;
  member: TeamMember;
  reducedMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const floatAnimation = reducedMotion
    ? undefined
    : {
        x: member.startsAbove ? [0, 6, -4, 0] : [0, -6, 4, 0],
        y: member.startsAbove ? [-10, 10, -10] : [10, -10, 10],
      };
  const shouldFloat = !reducedMotion && !isHovered;

  return (
    <motion.div
      className={member.desktopOffsetClassName}
      initial={{ opacity: 0, y: 28 }}
      transition={{ ...revealTransition, delay }}
      viewport={{ amount: 0.3, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        animate={shouldFloat ? floatAnimation : { x: 0, y: 0 }}
        className="relative will-change-transform"
        transition={
          shouldFloat
            ? {
                duration: member.floatingDuration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
            : { duration: 0.24, ease: "easeOut" }
        }
      >
        <Link
          aria-label={`${member.name}, ${member.role}`}
          className="group block focus:outline-none"
          href={member.href}
        >
          <motion.div
            className="relative isolate aspect-square w-full rounded-full border border-white/10 bg-transparent p-2 shadow-[0_18px_45px_rgba(2,6,23,0.25)] focus-visible:ring-sky-300/40"
            initial="rest"
            onHoverEnd={() => setIsHovered(false)}
            onHoverStart={() => setIsHovered(true)}
            transition={hoverTransition}
            variants={{
              hover: reducedMotion ? {} : { scale: 1.05 },
              rest: { scale: 1 },
            }}
            whileFocus="hover"
            whileHover="hover"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-transparent [clip-path:inset(1px_round_9999px)]">
              <div className="absolute inset-[-1px] transform-gpu">
                <Image
                  alt={member.name}
                  className="h-full w-full object-cover"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 75vw, (max-width: 1280px) 280px, 320px"
                  src={member.imageSrc}
                />
              </div>

              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.14)_62%,rgba(2,6,23,0.78)_100%)]" />

              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.9))]"
                transition={hoverTransition}
                variants={{
                  hover: { opacity: 1 },
                  rest: { opacity: 0.12 },
                }}
              />

              <motion.div
                className="absolute inset-x-[14%] bottom-[14%] z-10 text-center"
                transition={hoverTransition}
                variants={{
                  hover: { opacity: 1, y: 0 },
                  rest: { opacity: 0, y: 10 },
                }}
              >
                <p className="text-sm font-medium text-sky-100/95">
                  {member.role}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {member.name}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function FloatingTechBadge({
  badge,
  badgeIndex,
  reducedMotion,
}: {
  badge: TechBadge;
  badgeIndex: number;
  reducedMotion: boolean;
}) {
  const fadeControls = useAnimationControls();
  const startsVisible = badgeIndex % 2 === 0;

  useEffect(() => {
    if (reducedMotion) {
      fadeControls.set({ opacity: 1 });
      return;
    }

    let isCancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const hiddenOpacity = 0;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const wait = (delayMs: number) =>
      new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, delayMs);
      });

    const runFadeLoop = async () => {
      let isVisible = startsVisible;
      fadeControls.set({ opacity: isVisible ? 1 : hiddenOpacity });
      await wait(randomInRange(0, 3) * 1000);

      while (!isCancelled) {
        const fadeInDuration = randomInRange(3, 4);
        const visibleDuration = randomInRange(4, 5);
        const fadeOutDuration = randomInRange(3, 4);
        const hiddenDuration = randomInRange(4, 5);

        if (isVisible) {
          await wait(visibleDuration * 1000);

          if (isCancelled) {
            return;
          }

          await fadeControls.start({
            opacity: hiddenOpacity,
            transition: {
              duration: fadeOutDuration,
              ease: "easeInOut",
            },
          });

          isVisible = false;
        } else {
          await wait(hiddenDuration * 1000);

          if (isCancelled) {
            return;
          }

          await fadeControls.start({
            opacity: 1,
            transition: {
              duration: fadeInDuration,
              ease: "easeInOut",
            },
          });

          isVisible = true;
        }

        if (isCancelled) {
          return;
        }
      }
    };

    runFadeLoop();

    return () => {
      isCancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      fadeControls.stop();
    };
  }, [fadeControls, reducedMotion, startsVisible]);

  return (
    <motion.div
      animate={
        reducedMotion
          ? undefined
          : {
              x: badge.startsAbove ? [0, 6, -4, 0] : [0, -6, 4, 0],
              y: badge.startsAbove ? [-8, 8, -8] : [8, -8, 8],
            }
      }
      className={cn("absolute z-30", badge.className, badge.sizeClassName)}
      transition={
        reducedMotion
          ? undefined
          : {
              delay: badge.delay,
              duration: badge.duration,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }
      }
    >
      <motion.div
        animate={fadeControls}
        className="h-full w-full"
        initial={{ opacity: 1 }}
      >
        <div className="h-full w-full rounded-full border border-white/10 bg-transparent p-2 shadow-[0_18px_45px_rgba(2,6,23,0.25)]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-white/[0.04]">
            <div className="absolute inset-[18%]">
              <Image
                alt={badge.alt}
                className={cn(
                  "h-full w-full object-contain",
                  badge.imageClassName,
                )}
                fill
                sizes="64px"
                src={badge.imageSrc}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const reducedMotion = Boolean(useReducedMotion());
  const badgeStageRef = useRef<HTMLDivElement | null>(null);
  const badgesVisible = useInView(badgeStageRef, {
    amount: 0.7,
    margin: "-18% 0px -18% 0px",
    once: false,
  });

  return (
    <AnimatedSection
      className="relative overflow-hidden py-24"
      id="team-section"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0),rgba(15,23,42,0.22)_42%,rgba(11,15,25,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.055] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.06, 0.98], x: [0, 24, -10], y: [0, -18, 8] }
          }
          className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-violet-500/9 blur-3xl"
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 15,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        />
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 0.96, 1.08], x: [0, -22, 12], y: [0, 18, -12] }
          }
          className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-sky-400/9 blur-3xl"
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 17,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        />
      </div>

      <Container className="max-w-[75rem]">
        <div className="relative">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 22 }}
            transition={revealTransition}
            viewport={{ amount: 0.35, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Team
            </span>
            <h2 className="heading text-3xl sm:text-4xl">
              Meet the Nomadicoders squad
            </h2>
            <p className="subheading">
              A senior duo building scalable, production-ready applications - no
              outsourcing, no shortcuts.
            </p>
          </motion.div>

          <div
            className="relative mx-auto mt-16 max-w-[66rem] pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
            ref={badgeStageRef}
          >
            <motion.div
              animate={
                reducedMotion
                  ? { opacity: badgesVisible ? 1 : 0 }
                  : badgesVisible
                    ? { filter: "blur(0px)", opacity: 1, scale: 1 }
                    : { filter: "blur(12px)", opacity: 0, scale: 0.92 }
              }
              className="pointer-events-none absolute inset-0 z-30"
              initial={false}
              transition={{
                duration: reducedMotion ? 0.55 : 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {techBadges.map((badge, index) => (
                <FloatingTechBadge
                  badge={badge}
                  badgeIndex={index}
                  key={badge.alt}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>

            <div className="relative z-20 flex flex-col items-center gap-12 md:gap-14 lg:flex-row lg:items-center lg:justify-center lg:gap-20">
              {teamMembers.map((member, index) => (
                <div
                  className="w-[min(72vw,16rem)] sm:w-[min(58vw,16.5rem)] lg:w-[min(30vw,16rem)]"
                  key={member.name}
                >
                  <TeamMemberOrb
                    delay={0.12 + index * 0.1}
                    member={member}
                    reducedMotion={reducedMotion}
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.p
            className="mx-auto mt-8 max-w-2xl text-center text-base leading-8 text-slate-300/95 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ ...revealTransition, delay: 0.12 }}
            viewport={{ amount: 0.35, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Behind every successful product is a team that knows how to build it
            right. At Nomadicoders, you work directly with senior engineers who
            design, build, and scale your application - without layers, delays,
            or compromises.
          </motion.p>
        </div>
      </Container>
    </AnimatedSection>
  );
}
