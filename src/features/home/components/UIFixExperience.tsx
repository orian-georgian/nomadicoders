"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  ChevronDown,
  LayoutGrid,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type BookingStatus = "confirmed" | "pending" | "cancelled";

type BookingRow = {
  id: number;
  name: string;
  date: string;
  price: string;
  status: BookingStatus;
};

type BrowserFrameProps = {
  accentClassName: string;
  children: ReactNode;
  label: string;
  surfaceLabel: string;
};

const bookings: BookingRow[] = [
  {
    id: 1,
    name: "Maya Johnson",
    date: "Apr 12, 2026",
    status: "confirmed",
    price: "$480",
  },
  {
    id: 2,
    name: "Ethan Cole",
    date: "Apr 15, 2026",
    status: "pending",
    price: "$320",
  },
  {
    id: 3,
    name: "Sofia Turner",
    date: "Apr 18, 2026",
    status: "cancelled",
    price: "$190",
  },
  {
    id: 4,
    name: "Lucas Reed",
    date: "Apr 21, 2026",
    status: "confirmed",
    price: "$540",
  },
];

function BrowserFrame({
  accentClassName,
  children,
  label,
  surfaceLabel,
}: BrowserFrameProps) {
  return (
    <div className="flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b1120]/90 shadow-[0_24px_80px_rgba(2,6,23,0.28)]">
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
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

function getStatusText(
  t: ReturnType<typeof useTranslations>,
  status: BookingStatus,
) {
  return t(`statuses.${status}`);
}

function statusTone(status: BookingStatus) {
  if (status === "confirmed") return "bg-emerald-400/10 text-emerald-200";
  if (status === "pending") return "bg-amber-400/10 text-amber-200";
  return "bg-rose-400/10 text-rose-200";
}

function BeforeDashboard({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <BrowserFrame
      accentClassName="bg-rose-500/10 text-rose-200"
      label={t("before")}
      surfaceLabel="dashboard/before-ui"
    >
      <div className="relative flex h-full flex-col gap-4">
        <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-rose-400/20 blur-2xl" />

        <div className="rounded-[1rem] border border-white/8 bg-slate-950/65 px-3 py-2.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[22rem]">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {t("dashboardTitle")}
              </h3>
              <p className="mt-1 text-[11px] leading-5 text-emerald-300/80">
                {t("dashboardSubtitle")}
              </p>
            </div>

            <div className="flex items-start gap-1 self-start">
              <div className="rounded-xl border border-white/10 bg-slate-900/70 px-2 py-1.5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {t("statuses.confirmed")}
                </p>
                <p className="mt-1 text-[17px] font-bold text-white">2</p>
              </div>
              <div className="mt-1 rounded-md border border-sky-400/20 bg-slate-900/55 px-2.5 py-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {t("statuses.pending")}
                </p>
                <p className="mt-0.5 text-[15px] font-semibold text-white">1</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {bookings.map((booking, index) => (
            <div
              key={booking.id}
              className={cn(
                "rounded-[1rem] border border-white/8 bg-slate-950/65 p-2",
                index === 0 && "mr-2",
                index === 1 && "ml-1 px-3 py-2.5",
                index === 2 && "mt-1",
                index === 3 && "-mt-1 ml-2",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate font-semibold text-sky-200",
                      index % 2 === 0 ? "text-[13px]" : "text-[15px]",
                    )}
                  >
                    {booking.name}
                  </p>
                  <p
                    className={cn(
                      "mt-1 leading-none text-slate-500",
                      index === 1 ? "text-[11px]" : "text-[10px]",
                    )}
                  >
                    VIP booking
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex w-fit rounded-md px-1.5 py-1 font-semibold",
                    index === 0 &&
                      "bg-emerald-500/25 text-[10px] text-emerald-200",
                    index === 1 && "bg-sky-500/25 text-[11px] text-sky-100",
                    index === 2 && "bg-lime-500/30 text-[10px] text-lime-100",
                    index === 3 &&
                      "bg-violet-500/25 text-[9px] uppercase text-violet-100",
                  )}
                >
                  {getStatusText(t, booking.status)}
                </span>
              </div>

              <div
                className={cn(
                  "mt-3 grid gap-1.5",
                  index === 0
                    ? "grid-cols-[1.15fr_0.85fr]"
                    : "grid-cols-[1fr_auto]",
                )}
              >
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                    {t("columns.date")}
                  </p>
                  <div className="mt-1 inline-flex min-w-0 items-center gap-1 text-[11px] text-slate-300">
                    <CalendarDays
                      className="h-3.5 w-3.5 shrink-0 text-slate-500"
                      strokeWidth={1.8}
                    />
                    <span className="truncate">{booking.date}</span>
                  </div>
                </div>
                <div
                  className={cn(index % 2 === 0 ? "text-left" : "text-right")}
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300">
                    {t("columns.price")}
                  </p>
                  <p
                    className={cn(
                      "mt-1 font-bold text-white",
                      index === 2 ? "text-[15px]" : "text-[13px]",
                    )}
                  >
                    {booking.price}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "mt-3 flex items-center",
                  index === 0 && "justify-end gap-1",
                  index === 1 && "justify-between gap-2",
                  index === 2 && "justify-end gap-1.5",
                  index === 3 && "justify-between gap-1",
                )}
              >
                <button
                  className={cn(
                    "font-semibold text-slate-950 shadow-sm",
                    index % 2 === 0
                      ? "rounded-sm bg-sky-500 px-2 py-1 text-[10px]"
                      : "rounded-full bg-cyan-300 px-2.5 py-1 text-[11px]",
                  )}
                  type="button"
                >
                  {t("actions.view")}
                </button>
                <button
                  className={cn(
                    "font-medium",
                    index % 2 === 0
                      ? "rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-[10px] text-emerald-100"
                      : "rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-rose-100",
                  )}
                  type="button"
                >
                  {t("actions.cancel")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-300 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
            type="button"
          >
            {t("actions.loadMore")}
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}
function AfterDashboard({ t }: { t: ReturnType<typeof useTranslations> }) {
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;
  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  return (
    <BrowserFrame
      accentClassName="bg-emerald-500/10 text-emerald-200"
      label={t("after")}
      surfaceLabel="dashboard/after-ui"
    >
      <div className="relative flex h-full flex-col gap-4">
        <div className="space-y-4">
          <div className="flex items-baseline justify-start gap-2.5 pb-1">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-200">
              {t("afterDashboardTitle")}
            </h3>
            <span className="text-base font-semibold tracking-tight text-slate-300">
              {bookings.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
            <div className="flex min-w-[8rem] items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-xs font-semibold text-emerald-100 ring-1 ring-inset ring-emerald-300/20">
                {confirmedCount}
              </span>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t("statuses.confirmed")}
              </p>
            </div>
            <div className="flex min-w-[8rem] items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/15 text-xs font-semibold text-amber-100 ring-1 ring-inset ring-amber-300/20">
                {pendingCount}
              </span>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t("statuses.pending")}
              </p>
            </div>
            <div className="flex min-w-[8rem] items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-400/15 text-xs font-semibold text-rose-100 ring-1 ring-inset ring-rose-300/20">
                {cancelledCount}
              </span>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t("statuses.cancelled")}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              className="flex h-full flex-col rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[0_16px_34px_rgba(2,6,23,0.12)] transition-[transform,border-color,box-shadow] hover:border-white/12 hover:shadow-[0_20px_42px_rgba(2,6,23,0.16)]"
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[0.95rem] font-semibold tracking-tight text-white">
                    {booking.name}
                  </p>
                  <p className="text-xs text-slate-400">{t("rowMeta")}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                    statusTone(booking.status),
                  )}
                >
                  {getStatusText(t, booking.status)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t("columns.date")}
                  </p>
                  <div className="mt-1.5 inline-flex min-w-0 items-center gap-2 text-sm text-slate-300">
                    <CalendarDays
                      className="h-4 w-4 shrink-0 text-slate-500"
                      strokeWidth={1.8}
                    />
                    <span className="truncate">{booking.date}</span>
                  </div>
                </div>
                <div className="ml-auto flex w-fit flex-col items-end justify-self-end text-right">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t("columns.price")}
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold tracking-tight text-white">
                    {booking.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/8 pt-4">
                <button
                  className="rounded-xl bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.14]"
                  type="button"
                >
                  {t("actions.view")}
                </button>
                <button
                  className="rounded-xl bg-rose-500/14 px-3 py-1.5 text-xs font-medium text-rose-100 transition-colors hover:bg-rose-500/22 hover:text-white"
                  type="button"
                >
                  {t("actions.cancel")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/[0.14]"
            type="button"
          >
            <span>{t("actions.loadMore")}</span>
            <motion.span
              animate={{ y: [0, 2, 0] }}
              className="inline-flex"
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}
export function UIFixExperience() {
  const t = useTranslations("Home.uiFixExperience");
  const [isFixed, setIsFixed] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  const handleFixToggle = () => {
    if (isFixing) return;

    if (isFixed) {
      setIsFixed(false);
      return;
    }

    setIsFixing(true);

    window.setTimeout(() => {
      setIsFixed(true);
      setIsFixing(false);
    }, 2500);
  };

  return (
    <AnimatedSection
      className="relative overflow-hidden"
      id="ui-fix-experience"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.06, 0.96], x: [0, 30, -12], y: [0, -14, 10] }}
          className="absolute left-[-5rem] top-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.94, 1.04], x: [0, -24, 14], y: [0, 18, -10] }}
          className="absolute right-[-4rem] top-24 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl"
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      <Container>
        <div className="relative">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading whitespace-pre-line text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
          </div>

          <div className="relative mt-10 lg:mt-12">
            <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
              <motion.div
                animate={{
                  opacity: isFixed ? 0.45 : 1,
                  scale: isFixed ? 0.985 : 1,
                  y: isFixed ? -4 : 0,
                  filter: isFixed ? "blur(6px)" : "blur(0px)",
                }}
                className={cn("flex h-full flex-col gap-3", isFixed && "pointer-events-none select-none")}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex-1">
                  <BeforeDashboard t={t} />
                </div>
                <div className="flex flex-wrap gap-2 px-1">
                  {[
                    t("issues.cramped"),
                    t("issues.misaligned"),
                    t("issues.hardToRead"),
                  ].map((issue) => (
                    <span
                      key={issue}
                      className="rounded-full border border-rose-400/35 bg-rose-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-rose-200"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{
                  opacity: isFixed ? 1 : 0.45,
                  scale: isFixed ? 1 : 0.985,
                  y: isFixed ? 0 : 4,
                }}
                className={cn("flex h-full flex-col gap-3", !isFixed && "pointer-events-none select-none")}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative flex-1 overflow-hidden rounded-[1.6rem]">
                  {isFixing && !isFixed ? (
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
                        className="pointer-events-none absolute bottom-[-2rem] right-[-1rem] z-20 h-56 w-56 rounded-full bg-violet-400/28 blur-3xl"
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
                      scale: isFixed ? 1 : 0.992,
                    }}
                    className="relative z-0 h-full transition-[filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                    style={{ filter: isFixed ? undefined : "blur(6px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AfterDashboard t={t} />
                  </motion.div>
                </div>
                <motion.div
                  animate={{
                    filter: isFixed ? "blur(0px)" : "blur(6px)",
                    opacity: isFixed ? 1 : 0.45,
                    scale: isFixed ? 1 : 0.985,
                  }}
                  className="flex flex-wrap justify-start gap-2 px-1 lg:justify-end"
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {[
                    t("improvements.clearer"),
                    t("improvements.hierarchy"),
                    t("improvements.scan"),
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-emerald-200"
                    >
                      {item}
                    </span>
                  ))}
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
                disabled={isFixing}
                onClick={handleFixToggle}
                type="button"
                whileHover={isFixing ? undefined : { scale: 1.03, y: -1 }}
                whileTap={isFixing ? undefined : { scale: 0.98 }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {isFixed ? (
                    <RotateCcw className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <motion.span
                      animate={
                        isFixing
                          ? { rotate: [0, 20, -16, 0], scale: [1, 1.1, 1] }
                          : undefined
                      }
                      className="inline-flex"
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                        repeat: isFixing ? Number.POSITIVE_INFINITY : 0,
                      }}
                    >
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                  )}
                  {isFixed
                    ? t("resetButton")
                    : isFixing
                      ? t("fixingButton")
                      : t("button")}
                </span>
              </motion.button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.22em] text-slate-400">
              {isFixed ? (
                <CheckCircle2
                  className="h-3.5 w-3.5 text-emerald-300"
                  strokeWidth={1.8}
                />
              ) : (
                <AlertTriangle
                  className="h-3.5 w-3.5 text-rose-300"
                  strokeWidth={1.8}
                />
              )}
              {isFixed ? t("after") : t("before")}
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}











