"use client";

import {useEffect, useRef, useState} from "react";

import {animate, motion, useInView, useReducedMotion} from "framer-motion";
import {Code2, Network} from "lucide-react";

type CoverageStat = {
  label: string;
  live?: boolean;
  value: number;
  suffix?: string;
};

type CoverageMetricsProps = {
  stats: CoverageStat[];
  variant?: "cards" | "chart";
};

export function CoverageMetrics({stats, variant = "chart"}: CoverageMetricsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, {once: true, amount: 0.65});
  const reducedMotion = useReducedMotion();
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    setValues(stats.map(() => 0));
    if (!inView) return;

    const controls = stats.map((item, index) =>
      animate(0, item.value, {
        duration: 1.25 + index * 0.22,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          setValues((current) => {
            const next = [...current];
            next[index] = Math.round(latest);
            return next;
          });
        },
      }),
    );

    return () => controls.forEach((control) => control.stop());
  }, [inView, stats]);

  useEffect(() => {
    if (!inView || !stats.some((item) => item.live)) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let active = true;

    const scheduleUpdate = (delay: number) => {
      timeoutId = setTimeout(() => {
        if (!active) return;

        setValues((current) =>
          current.map((value, index) =>
            stats[index]?.live ? value + Math.floor(Math.random() * 5) + 1 : value,
          ),
        );

        scheduleUpdate(1200 + Math.floor(Math.random() * 2600));
      }, delay);
    };

    scheduleUpdate(1800);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [inView, stats]);

  if (variant === "cards") {
    return (
      <div className="grid w-full grid-cols-2 gap-3" ref={containerRef}>
        {stats.map((item, index) => (
          <div
            className="rounded-xl border border-white/10 bg-[#0b1120]/90 px-4 py-3.5 text-left shadow-[0_12px_36px_rgba(2,6,23,0.14)] sm:px-5"
            key={item.label}
          >
            <div className="flex items-center gap-2">
              {index === 0 ? (
                <Code2 aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-300" />
              ) : (
                <Network aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-purple" />
              )}
              <p className="text-lg font-bold leading-none tabular-nums text-white sm:text-xl">
                {`${new Intl.NumberFormat("en-US").format(values[index] ?? 0)}${item.suffix ?? ""}`}
              </p>
            </div>
            <p className="mt-2 text-[0.6rem] font-semibold uppercase leading-4 tracking-[0.14em] text-slate-400 sm:text-[0.65rem]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col" ref={containerRef}>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((item, index) => (
          <div key={item.label}>
            <p className="text-2xl font-bold leading-none tabular-nums text-white">
              {`${new Intl.NumberFormat("en-US").format(values[index] ?? 0)}${item.suffix ?? ""}`}
            </p>
            <p className="mt-1.5 whitespace-nowrap text-[0.65rem] leading-4 text-slate-300">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-2 h-20 w-full border-b border-white/15 pb-1">
        <div className="pointer-events-none absolute inset-x-0 top-3 border-t border-dashed border-white/10" />
        <div className="pointer-events-none absolute inset-x-0 top-9 border-t border-dashed border-white/10" />
        <div className="pointer-events-none absolute inset-x-0 top-[3.75rem] border-t border-dashed border-white/10" />
        <svg aria-label="Experience and delivery trend" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 120 56">
          <path
            d="M2 46 C14 43 18 38 30 39 S48 30 59 31 S76 20 88 23 S105 10 118 12"
            fill="none"
            stroke="rgb(56 189 248)"
            strokeLinecap="round"
            strokeWidth="2.2"
          />
          <path
            d="M2 50 C13 49 20 44 31 46 S48 39 60 40 S78 31 90 33 S106 23 118 19"
            fill="none"
            stroke="rgb(138 0 229)"
            strokeLinecap="round"
            strokeWidth="2.2"
          />
          {!reducedMotion ? (
            <>
              <motion.circle animate={{cx: [2, 30, 59, 88, 118], cy: [46, 39, 31, 23, 12]}} fill="rgb(186 230 253)" r="2.4" transition={{duration: 4.2, ease: "linear", repeat: Number.POSITIVE_INFINITY}} />
              <motion.circle animate={{cx: [2, 31, 60, 90, 118], cy: [50, 46, 40, 33, 19]}} fill="rgb(138 0 229)" r="2.2" transition={{delay: 0.5, duration: 4.6, ease: "linear", repeat: Number.POSITIVE_INFINITY}} />
            </>
          ) : null}
        </svg>
      </div>
    </div>
  );
}
