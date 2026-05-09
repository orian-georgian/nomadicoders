import type { ReactNode } from "react";

import { motion } from "framer-motion";

type HeroMetricCardProps = {
  title: string;
  animatedTopBorder?: boolean;
  className?: string;
  children: ReactNode;
};

export function HeroMetricCard({
  title,
  animatedTopBorder = false,
  className,
  children,
}: HeroMetricCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] border border-white/10 p-5 ${className ?? ""}`}
    >
      {animatedTopBorder ? (
        <motion.div
          animate={{ x: ["-120%", "140%"] }}
          className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-70"
          transition={{
            duration: 3.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ) : null}
      <p className="relative text-xs uppercase tracking-[0.24em] text-slate-400">
        {title}
      </p>
      <div className="relative mt-5">{children}</div>
    </div>
  );
}
