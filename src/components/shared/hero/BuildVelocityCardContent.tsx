"use client";

import { motion, useReducedMotion } from "framer-motion";

type BuildVelocityCardContentProps = {
  value: string;
  description: string;
  signal?: string;
};

const chartBars = [42, 68, 55, 84, 66, 100];

export function BuildVelocityCardContent({
  value,
  description,
  signal,
}: BuildVelocityCardContentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
            {value}
          </p>
          {signal ? (
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {signal}
            </p>
          ) : null}
        </div>

        <div className="relative flex h-20 w-28 items-end gap-1.5 border-b border-white/15 pb-1 sm:w-32">
          <div className="pointer-events-none absolute inset-x-0 top-3 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-9 border-t border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-[3.75rem] border-t border-dashed border-white/10" />
          {chartBars.map((height, index) => (
            <motion.span
              animate={
                reducedMotion
                  ? { height: `${height}%` }
                  : {
                      height: [
                        `${Math.max(22, height - 24)}%`,
                        `${height}%`,
                        `${Math.max(28, height - 12)}%`,
                        `${height}%`,
                      ],
                    }
              }
              className="relative z-10 flex-1 rounded-t-sm bg-gradient-to-t from-sky-400 to-brand-purple"
              key={height}
              transition={{
                delay: index * 0.1,
                duration: 2.4,
                ease: "easeInOut",
                repeat: reducedMotion ? 0 : Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
    </>
  );
}
