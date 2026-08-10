"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Gamepad2, LayoutDashboard, Menu, Radar, Search, Settings2, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { profile } from "@/lib/mock-data";

const nav = [
  { label: "Patch Radar", href: "/", icon: Radar },
  { label: "My Library", href: "/library", icon: Gamepad2 },
  { label: "Blueprints", href: "/blueprints", icon: Sparkles },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-border/70 bg-[#0b0e12]/95 px-4 py-5 backdrop-blur-xl transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="grid size-8 place-items-center rounded-lg bg-cyan text-[#081013] shadow-[0_0_22px_rgba(99,230,239,.28)]"><Zap size={17} fill="currentColor" /></div>
            <span className="text-lg font-bold tracking-tight">Opti<span className="text-cyan">Sync</span></span>
          </Link>
          <button className="text-muted lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="mt-11 px-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#596572]">Workspace</div>
        <nav className="mt-3 space-y-1">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", active ? "bg-cyan/10 font-semibold text-cyan" : "text-muted hover:bg-white/[.04] hover:text-foreground")}><item.icon size={17} className={cn(active ? "text-cyan" : "text-[#65717d] group-hover:text-foreground")} />{item.label}{active && <span className="ml-auto size-1.5 rounded-full bg-cyan shadow-[0_0_8px_#63e6ef]" />}</Link>;
          })}
        </nav>
        <div className="mt-9 px-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#596572]">System</div>
        <nav className="mt-3 space-y-1"><Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/[.04] hover:text-foreground"><Settings2 size={17} />Settings</Link></nav>
        <div className="mt-auto rounded-xl border border-border bg-panel-raised/70 p-3">
          <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted">Sync status</span><span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" />Live</span></div>
          <p className="mt-3 text-xs leading-5 text-muted">Your library is up to date. Last scan 4 minutes ago.</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full w-full rounded-full bg-gradient-to-r from-cyan to-purple" /></div>
        </div>
      </aside>
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border/70 bg-[#080a0d]/80 px-5 backdrop-blur-xl lg:px-9">
          <div className="flex items-center gap-3"><button className="text-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="hidden items-center gap-2 text-sm text-muted sm:flex"><LayoutDashboard size={15} />Workspace <span className="text-[#4d5965]">/</span> <span className="text-foreground">Patch Radar</span></div></div>
          <div className="flex items-center gap-2.5"><button className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-panel px-3 text-xs text-muted sm:flex"><Search size={14} />Search library <kbd className="ml-4 rounded border border-border px-1.5 py-0.5 text-[10px]">⌘ K</kbd></button><button className="grid size-9 place-items-center rounded-lg border border-border text-muted hover:bg-white/[.05] hover:text-foreground" aria-label="Notifications"><Bell size={16} /></button><div className="ml-1 hidden h-7 w-px bg-border sm:block" /><button className="flex items-center gap-2"><Avatar initials="AM" className="size-8" /><span className="hidden text-sm font-medium sm:block">{profile.username}</span><ChevronDown size={14} className="text-muted" /></button></div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
