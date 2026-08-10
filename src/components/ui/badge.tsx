import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { tone?: "cyan" | "violet" | "green" | "blue" | "orange" | "neutral" };

const tones = {
  cyan: "border-cyan/25 bg-cyan/10 text-cyan",
  violet: "border-purple/25 bg-purple/10 text-purple",
  green: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  blue: "border-blue-400/25 bg-blue-400/10 text-blue-300",
  orange: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  neutral: "border-border bg-white/[.04] text-muted",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return <span className={cn("inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[.12em]", tones[tone], className)} {...props} />;
}
