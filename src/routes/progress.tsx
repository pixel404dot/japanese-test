import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { LOCAL_SESSIONS_KEY, LOCAL_STATS_KEY } from "@/lib/kana";
import {
  listKanaStats,
  listPracticeSessions,
  type KanaStat,
  type SavedSession,
} from "@/lib/progress";
import { cn, speakJa } from "@/lib/utils";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const { user, isPending } = useCurrentUserState();
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [stats, setStats] = useState<KanaStat[]>([]);
  const [source, setSource] = useState<"account" | "device">("device");

  useEffect(() => {
    if (isPending) return;
    let cancelled = false;

    async function load() {
      if (user) {
        try {
          const [remoteSessions, remoteStats] = await Promise.all([
            listPracticeSessions(),
            listKanaStats(),
          ]);
          if (cancelled) return;
          setSessions(remoteSessions);
          setStats(remoteStats);
          setSource("account");
          return;
        } catch {
          /* fall through to local */
        }
      }
      if (cancelled) return;
      setSessions(readLocalSessions());
      setStats(readLocalStats());
      setSource("device");
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  const weak = stats
    .filter((s) => s.attempts > 0)
    .sort((a, b) => a.correct / a.attempts - b.correct / b.attempts)
    .slice(0, 16);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-10 px-4 py-8 sm:px-6 sm:py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
          Progress
        </p>
        <h1 className="text-4xl">Your weakest kana</h1>
        <p className="max-w-xl text-muted">
          {source === "account"
            ? "Saved to your account from every signed-in drill."
            : user
              ? "Showing this device until the next saved session syncs."
              : "Saved on this device. Sign in to keep a longer history."}
        </p>
        {!user && !isPending && (
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Sign in to sync</Link>
          </Button>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="text-lg">Needs review</h2>
        {weak.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {weak.map((stat) => {
              const rate = Math.round((stat.correct / stat.attempts) * 100);
              return (
                <li key={`${stat.script}-${stat.kana}`}>
                  <button
                    type="button"
                    onClick={() => speakJa(stat.kana)}
                    className="flex w-full items-center gap-3 rounded-xl bg-surface p-3 text-left shadow-border hover:shadow-border-hover"
                  >
                    <span className="grid size-12 place-items-center rounded-lg bg-bg font-serif text-2xl">
                      {stat.kana}
                    </span>
                    <span>
                      <span className="block text-sm font-medium tabular-nums">
                        {rate}%
                      </span>
                      <span className="text-xs text-muted">
                        {stat.correct}/{stat.attempts} · {stat.script}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg">Recent drills</h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted">Finish a drill to see it here.</p>
        ) : (
          <ul className="divide-y divide-ink/8 overflow-hidden rounded-xl bg-surface shadow-border">
            {sessions.map((session, i) => {
              const rate = Math.round((session.score / session.total) * 100);
              return (
                <li
                  key={session.id ?? i}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div>
                    <p className="font-medium capitalize">
                      {session.script} · {session.mode}
                    </p>
                    <p className="text-sm text-muted">
                      {session.lines.split(",").length} lines ·{" "}
                      {formatWhen(session.created_at)}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "font-serif text-2xl tabular-nums",
                      rate >= 80 ? "text-moss" : "text-ink",
                    )}
                  >
                    {rate}%
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl bg-surface px-5 py-8 text-center shadow-border">
      <p className="font-serif text-2xl">まだ</p>
      <p className="mt-2 text-sm text-muted">
        No stats yet. Run a mixed test on the first five lines to start a
        record.
      </p>
      <Button asChild className="mt-4">
        <Link to="/">Start a drill</Link>
      </Button>
    </div>
  );
}

function readLocalSessions(): SavedSession[] {
  try {
    const raw = localStorage.getItem(LOCAL_SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<
      Partial<SavedSession> & { created_at?: string }
    >;
    return parsed.map((row, i) => ({
      id: typeof row.id === "number" ? row.id : i,
      script: String(row.script ?? "mixed"),
      lines: String(row.lines ?? ""),
      mode: String(row.mode ?? "mixed"),
      score: Number(row.score ?? 0),
      total: Number(row.total ?? 1),
      created_at: String(row.created_at ?? ""),
    }));
  } catch {
    return [];
  }
}

function readLocalStats(): KanaStat[] {
  try {
    const raw = localStorage.getItem(LOCAL_STATS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, KanaStat>;
    return Object.values(parsed);
  } catch {
    return [];
  }
}

function formatWhen(value: string): string {
  if (!value) return "just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
