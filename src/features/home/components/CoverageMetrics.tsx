"use client";

import {useEffect, useRef, useState} from "react";

import {animate, motion, useInView, useReducedMotion} from "framer-motion";

type CoverageStat = {
  label: string;
  value: number;
  suffix?: string;
};

type CoverageMetricsProps = {
  stats: CoverageStat[];
};

export function CoverageMetrics({stats}: CoverageMetricsProps) {
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

  return (
    <div className="flex flex-1 flex-col" ref={containerRef}>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((item, index) => (
          <div key={item.label}>
            <p className="text-2xl font-bold leading-none tabular-nums text-white">
              {`${values[index] ?? 0}${item.suffix ?? ""}`}
            </p>
            <p className={`mt-1.5 text-[0.65rem] leading-4 text-slate-400 ${index === 1 ? "max-w-[4.5rem]" : ""}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 h-20 w-full border-b border-white/15 pb-1">
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
