export type ThemeChoice = "light" | "dark" | "system";
export type PaletteChoice = "ink" | "sage" | "plum";

const THEME_KEY = "learn-kana-theme";
const PALETTE_KEY = "learn-kana-palette";

export const PALETTES: {
  id: PaletteChoice;
  label: string;
  swatches: string[];
}[] = [
  { id: "ink", label: "Ink", swatches: ["#0c0b0a", "#f2ebe0", "#8f2d1f"] },
  { id: "sage", label: "Sage", swatches: ["#3f5344", "#e8eee4", "#f4f1ea"] },
  { id: "plum", label: "Plum", swatches: ["#6b243c", "#f3e4d4", "#f7f0e8"] },
];

export function readTheme(): ThemeChoice {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function readPalette(): PaletteChoice {
  try {
    const v = localStorage.getItem(PALETTE_KEY);
    if (v === "ink" || v === "sage" || v === "plum") return v;
  } catch {
    /* ignore */
  }
  return "ink";
}

export function resolvedTheme(choice: ThemeChoice): "light" | "dark" {
  if (choice === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return choice;
}

export function applyTheme(choice: ThemeChoice) {
  const resolved = resolvedTheme(choice);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch {
    /* ignore */
  }
}

export function applyPalette(choice: PaletteChoice) {
  document.documentElement.dataset.palette = choice;
  try {
    localStorage.setItem(PALETTE_KEY, choice);
  } catch {
    /* ignore */
  }
}
