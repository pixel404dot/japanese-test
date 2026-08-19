import { Link } from "@tanstack/react-router";
import { AuthSlot } from "@/components/auth-slot";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/8 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight">Kana Line</span>
          <span className="hidden font-serif text-sm text-primary sm:inline">
            五十音
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-2">
          <Link
            to="/"
            className="hidden h-9 items-center rounded-full px-3 text-sm text-muted transition-colors hover:text-ink sm:inline-flex"
            activeProps={{ className: "text-ink" }}
          >
            Drill
          </Link>
          <Link
            to="/chart"
            className="inline-flex h-9 items-center rounded-full px-2.5 text-sm text-muted transition-colors hover:text-ink sm:px-3"
            activeProps={{ className: "text-ink" }}
          >
            Chart
          </Link>
          <Link
            to="/progress"
            className="inline-flex h-9 items-center rounded-full px-2.5 text-sm text-muted transition-colors hover:text-ink sm:px-3"
            activeProps={{ className: "text-ink" }}
          >
            Progress
          </Link>
          <ThemeToggle />
          <AuthSlot />
        </nav>
      </div>
    </header>
  );
}
