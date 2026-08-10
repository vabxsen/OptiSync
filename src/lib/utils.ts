import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(date: string) {
  const value = new Date(date);
  const diff = Date.now() - value.getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
