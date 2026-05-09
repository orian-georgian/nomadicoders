import type {ButtonHTMLAttributes, ReactNode} from "react";

import {cn} from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-slate-950 hover:opacity-95 focus-visible:ring-sky-300/60",
  secondary:
    "glass text-white hover:bg-white/10 focus-visible:ring-white/20",
  ghost:
    "bg-transparent text-slate-200 hover:bg-white/5 focus-visible:ring-white/20"
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm sm:text-base"
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function Button({
  className,
  variant,
  size,
  icon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({variant, size, className})} type={type} {...props}>
      <span>{children}</span>
      {icon ? <span className="ml-2">{icon}</span> : null}
    </button>
  );
}
