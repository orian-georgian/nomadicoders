"use client";

import type {PropsWithChildren} from "react";

import {motion} from "framer-motion";

import {slideUp} from "@/lib/animations";
import {cn} from "@/lib/utils";

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export function AnimatedSection({children, className, id}: AnimatedSectionProps) {
  return (
    <motion.section
      className={cn("section", className)}
      id={id}
      initial="hidden"
      transition={{duration: 0.6}}
      variants={slideUp()}
      viewport={{amount: 0.2, once: true}}
      whileInView="visible"
    >
      {children}
    </motion.section>
  );
}
