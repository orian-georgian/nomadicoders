import type {HTMLAttributes} from "react";

import {cn} from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({className, ...props}: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 shadow-[0_20px_60px_rgba(11,15,25,0.25)]",
        className
      )}
      {...props}
    />
  );
}
