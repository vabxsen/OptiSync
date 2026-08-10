import { cn } from "@/lib/utils";

export function Surface({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-border/70 bg-panel panel-glow", className)} {...props} />;
}
