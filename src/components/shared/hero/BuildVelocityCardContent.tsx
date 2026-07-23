"use client";

import { motion, useReducedMotion } from "framer-motion";

type BuildVelocityCardContentProps = {
  value?: string;
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
      <div className="flex items-center justify-between gap-4">
        <div>
          {value ? (
            <p className="text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
              {value}
            </p>
          ) : (
            <svg aria-label="AI robot" className="h-14 w-12 text-sky-200" fill="none" viewBox="0 0 48 58">
              <path d="M24 3V8" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              <circle cx="24" cy="3" fill="#8a00e5" r="2" />
              <rect fill="currentColor" fillOpacity="0.08" height="16" rx="5" stroke="currentColor" strokeWidth="2" width="28" x="10" y="8" />
              <circle cx="18" cy="16" fill="currentColor" r="2" />
              <circle cx="30" cy="16" fill="currentColor" r="2" />
              <path d="M19 21H29" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
              <path d="M16 25V29M32 25V29" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              <rect fill="currentColor" fillOpacity="0.08" height="18" rx="4" stroke="currentColor" strokeWidth="2" width="22" x="13" y="29" />
              <circle cx="24" cy="36" fill="#8a00e5" r="2.5" />
              <path d="M18 42H30" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="1.5" />
              <path d="M13 32H8C6.9 32 6 32.9 6 34V43M35 32H40C41.1 32 42 32.9 42 34V43" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              <circle cx="6" cy="46" fill="currentColor" fillOpacity="0.18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="42" cy="46" fill="currentColor" fillOpacity="0.18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M19 47V54M29 47V54" stroke="currentColor" strokeWidth="3" />
              <path d="M15 55H20M28 55H33" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
            </svg>
          )}
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
