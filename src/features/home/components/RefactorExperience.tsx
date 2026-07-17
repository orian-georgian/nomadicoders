"use client";

import { useEffect, useRef, useState } from "react";

import { animate, motion, useInView } from "framer-motion";
import {
  Code2,
  FileText,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type CodeSegment = {
  className: string;
  text: string;
};

type CodeLine = {
  indent?: number;
  segments: CodeSegment[];
};

type CodeAnnotation = {
  label: string;
  left?: string;
  right?: string;
  top: string;
};

type MetricCardProps = {
  active: boolean;
  delay: number;
  end: number;
  fromWidth: number;
  label: string;
  start: number;
  suffix?: string;
  toWidth: number;
  toneClassName: string;
};

const tones = {
  comment: "text-[#637777]",
  function: "text-[#82aaff]",
  keyword: "text-[#c792ea]",
  number: "text-[#f78c6c]",
  string: "text-[#ecc48d]",
  symbol: "text-slate-300",
  variable: "text-[#f07178]",
};

const beforeCode: CodeLine[] = [
  {
    segments: [
      { className: tones.keyword, text: "function " },
      { className: tones.function, text: "processBooking" },
      { className: tones.symbol, text: "(booking) {" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "var " },
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "= " },
      { className: tones.number, text: "0" },
      { className: tones.symbol, text: ";" },
    ],
  },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// calculate total" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "for " },
      {
        className: tones.symbol,
        text: "(var i = 0; i < booking.services.length; i++) {",
      },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "+= booking.services[i].price;" },
    ],
  },
  { indent: 1, segments: [{ className: tones.symbol, text: "}" }] },
  { segments: [{ className: tones.symbol, text: "" }] },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// apply discount" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "if " },
      { className: tones.symbol, text: "(booking.customerType === " },
      { className: tones.string, text: '"VIP"' },
      { className: tones.symbol, text: ") {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "= total * " },
      { className: tones.number, text: "0.9" },
      { className: tones.symbol, text: ";" },
    ],
  },
  { indent: 1, segments: [{ className: tones.symbol, text: "}" }] },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// handle payment" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "if " },
      { className: tones.symbol, text: "(booking.paymentMethod === " },
      { className: tones.string, text: '"card"' },
      { className: tones.symbol, text: ") {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "= total + total * " },
      { className: tones.number, text: "0.02" },
      { className: tones.symbol, text: ";" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.symbol, text: "} " },
      { className: tones.keyword, text: "else if " },
      { className: tones.symbol, text: "(booking.paymentMethod === " },
      { className: tones.string, text: '"cash"' },
      { className: tones.symbol, text: ") {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "= total;" },
    ],
  },
  { indent: 1, segments: [{ className: tones.symbol, text: "}" }] },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// send notifications" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "if " },
      { className: tones.symbol, text: "(booking.type === " },
      { className: tones.string, text: '"online"' },
      { className: tones.symbol, text: ") {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.function, text: "sendEmail" },
      { className: tones.symbol, text: "(booking.email);" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.symbol, text: "} " },
      { className: tones.keyword, text: "else" },
      { className: tones.symbol, text: " {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.function, text: "printReceipt" },
      { className: tones.symbol, text: "();" },
    ],
  },
  { indent: 1, segments: [{ className: tones.symbol, text: "}" }] },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// save booking" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.function, text: "saveBooking" },
      { className: tones.symbol, text: "(total);" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "return " },
      { className: tones.variable, text: "total" },
      { className: tones.symbol, text: ";" },
    ],
  },
  { segments: [{ className: tones.symbol, text: "}" }] },
];
const afterCode: CodeLine[] = [
  {
    segments: [
      { className: tones.keyword, text: "import " },
      { className: tones.symbol, text: "{ " },
      { className: tones.function, text: "Booking" },
      { className: tones.symbol, text: ", " },
      { className: tones.function, text: "Service" },
      { className: tones.symbol, text: " } from " },
      { className: tones.string, text: '"@/types"' },
      { className: tones.symbol, text: ";" },
    ],
  },
  { segments: [{ className: tones.symbol, text: "" }] },
  {
    segments: [
      { className: tones.keyword, text: "const " },
      { className: tones.variable, text: "calculateTotal " },
      { className: tones.symbol, text: "= (services: Service[]): number =>" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.variable, text: "services" },
      {
        className: tones.symbol,
        text: ".reduce((sum, { price }) => sum + price, ",
      },
      { className: tones.number, text: "0" },
      { className: tones.symbol, text: ");" },
    ],
  },
  { segments: [{ className: tones.symbol, text: "" }] },
  {
    segments: [
      { className: tones.keyword, text: "const " },
      { className: tones.variable, text: "processBooking " },
      { className: tones.symbol, text: "= ({" },
    ],
  },
  {
    indent: 1,
    segments: [
      {
        className: tones.variable,
        text: "services, customerType, paymentMethod, type, email",
      },
    ],
  },
  {
    segments: [{ className: tones.symbol, text: "}: Booking): number => {" }],
  },
  {
    indent: 1,
    segments: [
      {
        className: tones.comment,
        text: "// Apply all transformations in a single chain",
      },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "const " },
      { className: tones.variable, text: "total " },
      { className: tones.symbol, text: "= [" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.symbol, text: "(total: number) => " },
      { className: tones.function, text: "calculateTotal" },
      { className: tones.symbol, text: "(services)," },
    ],
  },
  {
    indent: 2,
    segments: [
      {
        className: tones.symbol,
        text: "(total: number) => (customerType === ",
      },
      { className: tones.string, text: '"VIP"' },
      { className: tones.symbol, text: " ? total * " },
      { className: tones.number, text: "0.9" },
      { className: tones.symbol, text: " : total)," },
    ],
  },
  {
    indent: 2,
    segments: [
      {
        className: tones.symbol,
        text: "(total: number) => (paymentMethod === ",
      },
      { className: tones.string, text: '"card"' },
      { className: tones.symbol, text: " ? total * " },
      { className: tones.number, text: "1.02" },
      { className: tones.symbol, text: " : total)" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.symbol, text: "].reduce((acc, fn) => fn(acc), " },
      { className: tones.number, text: "0" },
      { className: tones.symbol, text: ");" },
    ],
  },
  {
    indent: 1,
    segments: [{ className: tones.comment, text: "// Handle notifications" }],
  },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "if " },
      { className: tones.symbol, text: "(type === " },
      { className: tones.string, text: '"online"' },
      { className: tones.symbol, text: " && email) {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.function, text: "sendEmail" },
      { className: tones.symbol, text: "(email);" },
    ],
  },
  {
    indent: 1,
    segments: [
      { className: tones.symbol, text: "} " },
      { className: tones.keyword, text: "else" },
      { className: tones.symbol, text: " {" },
    ],
  },
  {
    indent: 2,
    segments: [
      { className: tones.function, text: "printReceipt" },
      { className: tones.symbol, text: "();" },
    ],
  },
  { indent: 1, segments: [{ className: tones.symbol, text: "}" }] },
  {
    indent: 1,
    segments: [
      { className: tones.function, text: "saveBooking" },
      { className: tones.symbol, text: "(total);" },
    ],
  },
  { segments: [{ className: tones.symbol, text: "" }] },
  {
    indent: 1,
    segments: [
      { className: tones.keyword, text: "return " },
      { className: tones.variable, text: "total" },
      { className: tones.symbol, text: ";" },
    ],
  },
  { segments: [{ className: tones.symbol, text: "};" }] },
];

function CodeBlock({
  accentClassName,
  active,
  annotations,
  annotationClassName,
  helperText,
  label,
  lines,
  muted,
  surfaceLabel,
}: {
  accentClassName: string;
  active: boolean;
  annotations?: CodeAnnotation[];
  annotationClassName?: string;
  helperText?: string;
  label: string;
  lines: CodeLine[];
  muted?: boolean;
  surfaceLabel: string;
}) {
  return (
    <div className="flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          </div>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {label}
          </span>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.68rem] font-medium",
            accentClassName,
          )}
        >
          {surfaceLabel}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden px-5 py-4">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />
        <div className="relative h-full">
          {helperText ? (
            <p className="mb-3 text-[11px] font-medium tracking-[0.02em] text-slate-400">
              {helperText}
            </p>
          ) : null}

          <div className="relative space-y-1 font-mono text-[13px] leading-6">
            {lines.map((line, index) => (
              <motion.div
                key={`${label}-${index}`}
                animate={{
                  filter: active
                    ? "blur(0px)"
                    : muted
                      ? "blur(2px)"
                      : "blur(0px)",
                  opacity: active ? 1 : muted ? 0.36 : 1,
                  x: active ? 0 : muted ? -8 : 0,
                }}
                className="flex items-start gap-4 whitespace-pre-wrap"
                transition={{
                  delay: index * 0.035,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="w-5 shrink-0 text-right text-slate-600">
                  {index + 1}
                </span>
                <span
                  className="flex-1 break-words"
                  style={{ paddingLeft: `${(line.indent ?? 0) * 14}px` }}
                >
                  {line.segments.map((segment, segmentIndex) => (
                    <span className={segment.className} key={segmentIndex}>
                      {segment.text}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>

          {annotations?.length ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12.5rem]">
              {annotations.map((annotation) => (
                <span
                  key={annotation.label}
                  className={cn(
                    "absolute rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.02em] backdrop-blur-sm",
                    annotationClassName ??
                      "border border-rose-400/18 bg-rose-500/10 text-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.12)]",
                  )}
                  style={{
                    left: annotation.left,
                    right: annotation.right,
                    top: annotation.top,
                  }}
                >
                  {annotation.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  active,
  delay,
  end,
  fromWidth,
  label,
  start,
  suffix,
  toWidth,
  toneClassName,
}: MetricCardProps) {
  const [value, setValue] = useState(start);
  const currentValueRef = useRef(start);

  useEffect(() => {
    const target = active ? end : start;

    const controls = animate(currentValueRef.current, target, {
      delay,
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        currentValueRef.current = rounded;
        setValue(rounded);
      },
    });
    return () => {
      controls.stop();
    };
  }, [active, delay, end, start]);
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.88, y: active ? 0 : 6 }}
      className="py-2"
      transition={{
        delay: delay + 0.1,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-end justify-between gap-4">
        <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {value}
          {suffix ? <span className="ml-0.5 text-slate-300">{suffix}</span> : null}
        </p>
        <p className="text-right text-xs font-semibold uppercase leading-4 tracking-[0.12em] text-slate-400">
          {label}
        </p>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.08] shadow-inner shadow-black/20">
        <motion.div
          animate={{ width: active ? `${toWidth}%` : `${fromWidth}%` }}
          className={cn("h-1.5 rounded-full bg-gradient-to-r", toneClassName)}
          transition={{
            delay: delay + 0.12,
            duration: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export function RefactorExperience({ embedded = false }: { embedded?: boolean }) {
  const t = useTranslations("Home.refactorExperience");
  const [hasTransformed, setHasTransformed] = useState(false);
  const [isRefactoring, setIsRefactoring] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: true });
  const metricsActive = inView && hasTransformed;

  const afterAnnotations: CodeAnnotation[] = [
    {
      label: t("afterPanel.annotations.flow"),
      top: "1.4rem",
      right: "0rem",
    },
    {
      label: t("afterPanel.annotations.reuse"),
      top: "39.5rem",
      right: "0rem",
    },
    {
      label: t("afterPanel.annotations.rules"),
      top: "15.5rem",
      right: "0rem",
    },
    {
      label: t("afterPanel.annotations.notifications"),
      top: "32rem",
      right: "0rem",
    },
  ];

  const beforeAnnotations: CodeAnnotation[] = [
    {
      label: t("beforePanel.annotations.responsibilities"),
      top: "2.0rem",
      right: "0rem",
    },
    {
      label: t("beforePanel.annotations.logic"),
      top: "10.2rem",
      right: "0rem",
    },
    {
      label: t("beforePanel.annotations.risk"),
      top: "27.5rem",
      right: "0rem",
    },
    {
      label: t("beforePanel.annotations.concerns"),
      top: "40.1rem",
      right: "0rem",
    },
  ];

  const handleRefactorToggle = () => {
    if (isRefactoring) return;

    if (hasTransformed) {
      setHasTransformed(false);
      return;
    }

    setIsRefactoring(true);

    window.setTimeout(() => {
      setHasTransformed(true);
      setIsRefactoring(false);
    }, 1300);
  };
  const Section = embedded ? motion.div : AnimatedSection;

  return (
    <Section
      className="relative overflow-hidden"
      id="refactor-experience"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.08, 0.96], x: [0, 26, -10], y: [0, -18, 8] }}
          className="absolute left-[-6rem] top-8 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl"
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.94, 1.06], x: [0, -18, 14], y: [0, 20, -12] }}
          className="absolute right-[-5rem] top-12 h-60 w-60 rounded-full bg-brand-purple/12 blur-3xl"
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      <Container>
        <div className="relative" ref={sectionRef}>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading whitespace-pre-line text-3xl sm:text-4xl">
              {t("title")}
            </h2>
            <p className="subheading">{t("description")}</p>
          </div>
          <div className="relative mt-8 lg:mt-10">
            <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
              <motion.div
                className={cn(
                  "h-full",
                  hasTransformed && "pointer-events-none select-none",
                )}
                animate={{
                  opacity: hasTransformed ? 0.65 : 1,
                  scale: hasTransformed ? 0.985 : 1,
                  y: hasTransformed ? -4 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{
                    opacity: 1,
                    scale: hasTransformed ? 0.992 : 1,
                  }}
                  className="relative z-0 h-full transition-[filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                  style={{ filter: hasTransformed ? "blur(6px)" : undefined }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-3 flex justify-center">
                    <p className="text-center text-[11px] font-medium tracking-[0.02em] text-slate-400">
                      {t("beforePanel.helper")}
                    </p>
                  </div>
                  <CodeBlock
                    accentClassName="bg-rose-500/10 text-rose-200"
                    active={!hasTransformed}
                    annotations={beforeAnnotations}
                    label={t("before")}
                    lines={beforeCode}
                    surfaceLabel="bookings/before.js"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className={cn(
                  "relative h-full",
                  !hasTransformed && "pointer-events-none select-none",
                )}
                animate={{
                  opacity: hasTransformed ? 1 : 0.45,
                  scale: hasTransformed ? 1 : 0.985,
                  y: hasTransformed ? 0 : 4,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {isRefactoring && !hasTransformed ? (
                  <>
                    <motion.div
                      animate={{ opacity: [0.18, 0.32, 0.2] }}
                      className="pointer-events-none absolute inset-0 z-20 rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(56,189,248,0.14),transparent_36%,rgba(168,85,247,0.14))]"
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <motion.div
                      animate={{ opacity: [0.45, 0.8, 0.45] }}
                      className="pointer-events-none absolute inset-0 z-20 rounded-[1.6rem] ring-1 ring-sky-300/20 ring-inset"
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <motion.div
                      animate={{
                        opacity: [0.24, 0.48, 0.26],
                        scale: [0.94, 1.08, 0.98],
                        x: [-12, 16, -8],
                        y: [10, -12, 8],
                      }}
                      className="pointer-events-none absolute left-[-1.5rem] top-[-1rem] z-20 h-52 w-52 rounded-full bg-sky-400/30 blur-3xl"
                      transition={{
                        duration: 1.75,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.42, 0.22],
                        scale: [0.98, 1.14, 1],
                        x: [12, -18, 10],
                        y: [-8, 14, -6],
                      }}
                      className="pointer-events-none absolute bottom-[-2rem] right-[-1rem] z-20 h-56 w-56 rounded-full bg-brand-purple/28 blur-3xl"
                      transition={{
                        duration: 1.95,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <motion.div
                      animate={{ x: ["-30%", "120%"], opacity: [0, 0.5, 0] }}
                      className="pointer-events-none absolute inset-y-4 left-0 z-30 w-28 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-xl"
                      transition={{
                        duration: 1.1,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </>
                ) : null}
                <motion.div
                  animate={{
                    opacity: 1,
                    scale: hasTransformed ? 1 : 0.992,
                  }}
                  className="relative z-0 h-full transition-[filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                  style={{ filter: hasTransformed ? undefined : "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-3 flex justify-center">
                    <p className="text-center text-[11px] font-medium tracking-[0.02em] text-slate-400">
                      {t("afterPanel.helper")}
                    </p>
                  </div>
                  <CodeBlock
                    accentClassName="bg-emerald-500/10 text-emerald-200"
                    annotations={afterAnnotations}
                    annotationClassName="border border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                    active={hasTransformed}
                    label={t("after")}
                    lines={afterCode}
                    surfaceLabel="bookings/after.ts"
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-6 flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <motion.button
                className={buttonVariants({
                  className:
                    "relative overflow-hidden px-6 shadow-[0_16px_45px_rgba(56,189,248,0.18)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_58%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 disabled:pointer-events-none disabled:opacity-90",
                  size: "lg",
                })}
                disabled={isRefactoring}
                onClick={handleRefactorToggle}
                type="button"
                whileHover={isRefactoring ? undefined : { scale: 1.03, y: -1 }}
                whileTap={isRefactoring ? undefined : { scale: 0.98 }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {hasTransformed ? (
                    <RotateCcw className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <motion.span
                      animate={
                        isRefactoring
                          ? { rotate: [0, 20, -16, 0], scale: [1, 1.1, 1] }
                          : undefined
                      }
                      className="inline-flex"
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                        repeat: isRefactoring ? Number.POSITIVE_INFINITY : 0,
                      }}
                    >
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                  )}
                  {hasTransformed
                    ? t("resetButton")
                    : isRefactoring
                      ? t("refactoringButton")
                      : t("button")}
                </span>
              </motion.button>
            </div>

            {hasTransformed ? (
              <motion.div
                animate={{ x: ["-110%", "110%"] }}
                className="pointer-events-none absolute inset-x-[14%] top-0 hidden h-full bg-gradient-to-r from-transparent via-sky-200/12 to-transparent blur-xl lg:block"
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-4 md:grid-cols-3">
            <MetricCard
              active={metricsActive}
              delay={0.05}
              end={92}
              fromWidth={45}
              label={t("metrics.performance")}
              start={45}
              suffix="%"
              toWidth={92}
              toneClassName="from-sky-400 to-cyan-300"
            />
            <MetricCard
              active={metricsActive}
              delay={0.14}
              end={91}
              fromWidth={30}
              label={t("metrics.maintainability")}
              start={30}
              suffix="%"
              toWidth={91}
              toneClassName="from-pink-400 to-rose-300"
            />
            <MetricCard
              active={metricsActive}
              delay={0.24}
              end={0}
              fromWidth={72}
              label={t("metrics.bugs")}
              start={12}
              toWidth={0}
              toneClassName="from-emerald-400 to-teal-300"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.22em] text-slate-400">
              <Code2 className="h-3.5 w-3.5 text-sky-300" strokeWidth={1.8} />
              {hasTransformed ? t("after") : t("before")}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}


