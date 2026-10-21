import { useState } from "react";
import { cn } from "@/lib/cn";

export function Spoiler({
  children,
  label = "pronunciation",
  variant = "chip",
  className,
  defaultOpen = false,
}: {
  children: string;
  label?: string;
  variant?: "chip" | "line";
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <button
      type="button"
      aria-label={open ? `Hide ${label}` : `Reveal ${label}`}
      aria-pressed={open}
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "rounded-md px-2.5 text-sm leading-snug transition-[color,background-color] duration-150",
        variant === "chip"
          ? "max-w-[11rem] min-h-11 min-w-16 shrink-0 text-right sm:max-w-xs"
          : "mt-1.5 min-h-9 w-full px-3 py-2 text-left",
        open
          ? "text-muted hover:bg-elevated"
          : "spoiler-hidden select-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
