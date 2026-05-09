import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipProps = {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
};

export function Tooltip({
  content,
  children,
  side = "top",
  delay = 0.1,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClass = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  }[side];

  const arrowClass = {
    top: "top-full border-t-slate-900 border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "bottom-full border-b-slate-900 border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full border-l-slate-900 border-t-transparent border-b-transparent border-r-transparent",
    right:
      "right-full border-r-slate-900 border-t-transparent border-b-transparent border-l-transparent",
  }[side];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${positionClass}`}
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, delay }}
          >
            <div className="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-black/50">
              {content}
              <div
                className={`absolute border-4 ${arrowClass}`}
                style={{ left: "50%", transform: "translateX(-50%)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
