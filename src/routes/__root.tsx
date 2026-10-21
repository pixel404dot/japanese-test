import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { ProgressSync } from "@/components/progress-sync";
import appCss from "../styles.css?url";

const APP_NAME = "Learn Kana";

const THEME_BOOT = `(function(){try{var t=localStorage.getItem("learn-kana-theme")||"dark";var p=localStorage.getItem("learn-kana-palette")||"ink";if(p!=="ink"&&p!=="sage"&&p!=="plum")p="ink";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=d?"dark":"light";var e=document.documentElement;e.dataset.theme=r;e.dataset.palette=p;e.classList.toggle("dark",d);e.style.colorScheme=r;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Practice hiragana, katakana, and vocabulary until they stick.",
      },
      { name: "theme-color", content: "#100e0c" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500&family=Shippori+Mincho:wght@500&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <Header />
          <ProgressSync />
          <Outlet />
          <BottomNav />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
