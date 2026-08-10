import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-cyan text-[#071013] shadow-[0_0_24px_rgba(99,230,239,.16)] hover:bg-[#82edf3]",
  secondary: "border border-border bg-panel-raised text-foreground hover:bg-[#1b232d]",
  ghost: "text-muted hover:bg-white/[.05] hover:text-foreground",
  danger: "bg-orange-400/10 text-orange-300 hover:bg-orange-400/20",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} {...props} />;
}
