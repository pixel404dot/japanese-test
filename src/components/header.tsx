import { Link } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  applyPalette,
  applyTheme,
  PALETTES,
  readPalette,
  readTheme,
  type PaletteChoice,
  type ThemeChoice,
} from "@/lib/theme";

const CHOICES: { id: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export function Header() {
  const [theme, setTheme] = useState<ThemeChoice>("dark");
  const [palette, setPalette] = useState<PaletteChoice>("ink");

  useEffect(() => {
    const current = readTheme();
    const currentPalette = readPalette();
    setTheme(current);
    setPalette(currentPalette);
    applyTheme(current);
    applyPalette(currentPalette);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-bg/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-fg no-underline">
          <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-seal font-display text-lg leading-none text-seal-fg">
            あ
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap font-display text-sm leading-none tracking-tight sm:text-base">
              Learn Kana
            </span>
            <span className="mt-1 hidden text-[0.65rem] uppercase tracking-[0.18em] text-subtle sm:block">
              Japanese studio
            </span>
          </span>
        </Link>
        <nav className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <AuthSlot />
          <div className="seg hidden md:inline-flex" role="radiogroup" aria-label="Color palette">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={palette === p.id}
                aria-label={p.label}
                title={p.label}
                onClick={() => {
                  setPalette(p.id);
                  applyPalette(p.id);
                }}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150",
                  palette === p.id ? "bg-fg/10" : "hover:bg-fg/5",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none flex size-4 overflow-hidden rounded-full",
                    palette === p.id &&
                      "ring-1 ring-fg ring-offset-1 ring-offset-elevated",
                  )}
                >
                  {p.swatches.map((color) => (
                    <span
                      key={color}
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
          <div className="seg hidden sm:inline-flex" role="radiogroup" aria-label="Theme">
            {CHOICES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={theme === id}
                aria-label={label}
                onClick={() => {
                  setTheme(id);
                  applyTheme(id);
                }}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150",
                  theme === id
                    ? "bg-accent text-accent-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full bg-elevated text-muted shadow-[var(--shadow-border)] sm:hidden"
            aria-label={`Theme: ${theme}. Tap to change.`}
            onClick={() => {
              const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
              setTheme(next);
              applyTheme(next);
            }}
          >
            {theme === "light" ? (
              <Sun className="size-3.5" />
            ) : theme === "system" ? (
              <Monitor className="size-3.5" />
            ) : (
              <Moon className="size-3.5" />
            )}
          </button>
        </nav>
      </div>
      <div className="h-px bg-border/80" />
    </header>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-9 shrink-0 animate-pulse rounded-full bg-elevated" />;
  }
  if (user) {
    return (
      <div className="min-w-0 max-w-[9.5rem] overflow-hidden sm:max-w-xs">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="inline-flex h-9 items-center rounded-full bg-accent px-3 text-xs font-medium text-accent-fg no-underline sm:px-3.5 sm:text-sm"
    >
      Sign in
    </Link>
  );
}
