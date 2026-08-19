import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="rounded-xl bg-surface p-8 shadow-border">
        <p className="font-serif text-3xl text-primary">あ</p>
        <h1 className="mt-3 text-3xl">Sign in</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Keep your weakest kana and drill history with you. Practice still
          works as a guest — it just stays on this device.
        </p>

        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
              >
                Continue with {provider.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Back to practice
        </Link>
      </div>
    </main>
  );
}
