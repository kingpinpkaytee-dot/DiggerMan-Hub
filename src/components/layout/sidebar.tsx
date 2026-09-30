"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  Inbox,
  Calendar,
  Settings,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Command Center", icon: LayoutDashboard },
  { href: "/compose", label: "Compose", icon: PenSquare },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/channels", label: "Channels", icon: Radio },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="flex h-14 items-center gap-2 border-b border-[hsl(var(--border))] px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-sm font-bold text-[hsl(var(--primary-foreground))]">
          DM
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">DiggerMan Hub</p>
          <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
            Social War Room
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-2">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))]"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[hsl(var(--border))] p-3 text-[11px] text-[hsl(var(--muted-foreground))]">
        v0.1.0 · Local SQLite
      </div>
    </aside>
  );
}
