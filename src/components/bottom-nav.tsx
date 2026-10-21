import { Link, useRouterState } from "@tanstack/react-router";
import { BookA, BookOpen, BookText, Home, Languages, Layers } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  { to: "/" as const, label: "Home", icon: Home },
  { to: "/hiragana" as const, label: "Kana", icon: Languages },
  { to: "/vocabulary" as const, label: "Vocab", icon: BookOpen },
  { to: "/kanji" as const, label: "Kanji", icon: BookA },
  { to: "/cards" as const, label: "Cards", icon: Layers },
  { to: "/reading" as const, label: "Read", icon: BookText },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (
    pathname.startsWith("/practice") ||
    pathname.startsWith("/results") ||
    pathname.startsWith("/login") ||
    pathname.includes("/study")
  ) {
    return null;
  }

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] print:hidden"
      aria-label="Main"
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg items-stretch rounded-full border border-border/80 bg-bg/80 p-1 shadow-[var(--shadow-border)] backdrop-blur-xl">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const on =
            to === "/"
              ? pathname === "/"
              : to === "/hiragana"
                ? pathname.startsWith("/hiragana") ||
                  pathname.startsWith("/katakana")
                : pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-xs font-medium tracking-wide no-underline transition-colors duration-150",
                on ? "text-seal" : "text-muted hover:text-fg",
              )}
            >
              <span className="grid size-7 place-items-center">
                <Icon className="size-4" strokeWidth={on ? 2.25 : 1.75} />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
