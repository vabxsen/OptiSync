import { cn } from "@/lib/utils";

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return <div className={cn("grid size-9 place-items-center rounded-full border border-cyan/25 bg-cyan/10 text-[11px] font-bold text-cyan", className)}>{initials}</div>;
}
