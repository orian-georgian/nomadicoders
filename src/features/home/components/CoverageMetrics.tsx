"use client";

import { useEffect, useRef, useState } from "react";

import { animate, motion, useInView } from "framer-motion";

type CoverageStat = {
  label: string;
  value: number;
  suffix?: string;
};

type CoverageMetricsProps = {
  stats: CoverageStat[];
};

export function CoverageMetrics({ stats }: CoverageMetricsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.65 });
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    setValues(stats.map(() => 0));

    if (!inView) {
      return;
    }

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
      })
    );

    return () => {
      controls.forEach((control) => control.stop());
    };
  }, [inView, stats]);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col justify-center space-y-5"
    >
      {stats.map((item, index) => (
        <div key={item.label}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-300">{item.label}</span>
            <span className="text-lg font-semibold tabular-nums text-white">
              {`${values[index] ?? 0}${item.suffix ?? ""}`}
            </span>
          </div>
          <div className="relative mt-3 h-3 overflow-hidden rounded-sm border border-white/10 bg-slate-950/70">
            <motion.div
              animate={{ width: ["20%", "86%", "74%"] }}
              className="h-full rounded-sm bg-gradient-to-r from-sky-400 via-brand-purple to-brand-purple shadow-[0_0_14px_rgba(138,0,229,0.32)]"
              transition={{
                duration: 5 + item.value.toString().length + index * 0.35,
                delay: index * 0.45,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
