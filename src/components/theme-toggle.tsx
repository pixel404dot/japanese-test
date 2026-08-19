import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={() => toggleTheme()}
      className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-ink/8 hover:text-ink"
    >
      <span className="relative size-4">
        <Sun
          className="absolute inset-0 size-4 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] dark:scale-[0.25] dark:opacity-0 dark:blur-[4px]"
          strokeWidth={1.75}
        />
        <Moon
          className="size-4 scale-[0.25] opacity-0 blur-[4px] transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] dark:scale-100 dark:opacity-100 dark:blur-none"
          strokeWidth={1.75}
        />
      </span>
    </button>
  );
}
