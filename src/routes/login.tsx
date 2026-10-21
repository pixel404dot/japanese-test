import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [busy, setBusy] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (isPending) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-sm place-items-center px-4">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-elevated" />
      </main>
    );
  }
  if (user) return <Navigate to="/" />;

  async function startOAuth(providerId: string) {
    if (busy) return;
    setError(null);
    setBusy(providerId);
    try {
      const origin = window.location.origin;
      await signIn(providerId, {
        callbackURL: `${origin}/`,
        errorCallbackURL: `${origin}/login`,
      });
    } catch (err) {
      setBusy(null);
      setError(err instanceof Error ? err.message : "Sign-in failed");
    }
  }

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError(null);
    setBusy("email");
    try {
      const payload = {
        email: email.trim(),
        password,
      };
      const result =
        mode === "signup"
          ? await authClient.signUp.email({
              ...payload,
              name: payload.email.split("@")[0] || "Learner",
            })
          : await authClient.signIn.email(payload);
      if (result.error) {
        setBusy(null);
        setError(result.error.message ?? "Sign-in failed");
        return;
      }
      window.location.assign("/");
    } catch (err) {
      setBusy(null);
      setError(err instanceof Error ? err.message : "Sign-in failed");
    }
  }

  return (
    <main className="page max-w-md">
      <p className="glyph">あ</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Sign in</h1>
      <p className="mt-3 text-sm text-muted">
        Save progress across phone and web. Email works even if Google is blocked
        inside another app.
      </p>
      {error ? (
        <p className="mt-4 rounded-xl bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)]">
          {error}
        </p>
      ) : null}
      {authEnabled ? (
        <>
          <div className="mt-8 space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                disabled={Boolean(busy)}
                onClick={() => void startOAuth(p.providerId)}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-accent-fg disabled:opacity-60"
              >
                {busy === p.providerId ? "Opening…" : `Continue with ${p.label}`}
              </button>
            ))}
          </div>
          <p className="kicker mt-8 text-center">or email</p>
          <form className="mt-4 space-y-2" onSubmit={(e) => void submitEmail(e)}>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
            <button
              type="submit"
              disabled={Boolean(busy)}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-elevated px-4 text-sm font-medium text-fg shadow-[var(--shadow-border)] disabled:opacity-60"
            >
              {busy === "email"
                ? "Please wait…"
                : mode === "signup"
                  ? "Create account"
                  : "Sign in with email"}
            </button>
          </form>
          <button
            type="button"
            className="mt-4 text-sm text-muted hover:text-fg"
            onClick={() => {
              setMode(mode === "signup" ? "signin" : "signup");
              setError(null);
            }}
          >
            {mode === "signup"
              ? "Already have an account? Sign in"
              : "New here? Create an account"}
          </button>
        </>
      ) : (
        <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
      )}
      <Link
        to="/"
        className="mt-8 text-center text-sm text-muted no-underline hover:text-fg"
      >
        Continue without an account
      </Link>
    </main>
  );
}
