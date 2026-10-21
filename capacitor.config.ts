import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "me.grok.learnkana",
  appName: "Learn Kana",
  webDir: "mobile-www",
  server: {
    url: "https://learnjp.grok.me",
    androidScheme: "https",
    allowNavigation: [
      "learnjp.grok.me",
      "auth.grok.me",
      "*.google.com",
      "accounts.google.com",
      "*.googleusercontent.com",
      "x.com",
      "*.x.com",
      "twitter.com",
      "*.twitter.com",
      "api.twitter.com",
    ],
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
