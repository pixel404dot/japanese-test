export const THEME_KEY = "kana-line-theme";
export const THEME_LIGHT_BG = "#f3ead8";
export const THEME_DARK_BG = "#14110e";

export type Theme = "light" | "dark";

export function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode */
  }
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute(
      "content",
      theme === "dark" ? THEME_DARK_BG : THEME_LIGHT_BG,
    );
  }
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode */
  }
  applyTheme(theme);
}

export function toggleTheme() {
  const next: Theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  persistTheme(next);
  return next;
}

/** Runs before paint so the first frame matches the saved / system theme. */
export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_KEY)};var s=localStorage.getItem(k);var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
