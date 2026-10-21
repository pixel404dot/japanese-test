import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { unlockSpeech } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/results")({ component: ResultsPage });

const PRESETS = [5, 10, 15, 20, 25];

function ResultsPage() {
  const navigate = useNavigate();
  const last = useKanaStore((s) => s.lastSession);
  const setSettings = useKanaStore((s) => s.setSettings);
  const rows = useMemo(
    () =>
      last
        ? Object.entries(last.perKey)
            .map(([kana, t]) => ({
              kana,
              t: t.right > 0 ? t.timeSum / t.right / 1000 : null,
              wrong: t.wrong,
              right: t.right,
            }))
            .sort((a, b) => {
              if (a.t === null && b.t !== null) return -1;
              if (a.t !== null && b.t === null) return 1;
              if (a.t === null && b.t === null) return b.wrong - a.wrong;
              return (b.t ?? 0) - (a.t ?? 0);
            })
        : [],
    [last],
  );
  const options = useMemo(() => {
    const base = PRESETS.filter((n) => n <= rows.length);
    if (rows.length > 0 && !base.includes(rows.length)) base.push(rows.length);
    return base;
  }, [rows.length]);
  const [topN, setTopN] = useState(5);
  const [noRepeat, setNoRepeat] = useState(true);

  if (!last) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">No session yet</p>
        <Button asChild>
          <Link to="/">Start practicing</Link>
        </Button>
      </div>
    );
  }

  const avg = last.right > 0 ? last.timeSum / last.right / 1000 : null;
  const label = last.kind === "word" ? "Words" : "Kanas";
  const take = Math.min(topN, rows.length);
  const weak = rows.slice(0, take).map((r) => r.kana);

  return (
    <main className="page">
      <p className="kicker">
        Session
      </p>
      <h1 className="mt-1 font-display text-5xl tabular-nums tracking-tight">
        {last.right}
      </h1>
      <p className="mt-1 text-muted">{label} completed</p>

      <div className="mt-8 space-y-3 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
        {avg === null ? (
          <p className="text-sm text-muted">
            Not enough answers to score this round.
          </p>
        ) : (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Time per item</span>
              <span className="tabular-nums">{avg.toFixed(2)}s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Misses</span>
              <span className="tabular-nums">{last.wrong}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Hints</span>
              <span className="tabular-nums">{last.help}</span>
            </div>
          </>
        )}
        {rows.length > 0 ? (
          <div className="border-t border-border pt-3">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <p className="kicker">
                All times
              </p>
              <p className="text-xs text-subtle">
                {take} selected · slowest first
              </p>
            </div>
            {options.length > 0 ? (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {options.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={take === n}
                    onClick={() => setTopN(n)}
                    className={cn(
                      "min-h-9 min-w-11 rounded-md border px-2.5 text-sm tabular-nums",
                      take === n
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border bg-elevated text-muted hover:text-fg",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            ) : null}
            <ul className="max-h-72 space-y-0.5 overflow-y-auto">
              {rows.map((row, i) => (
                <li
                  key={row.kana}
                  className={cn(
                    "flex items-center justify-between rounded-sm px-2 py-1.5 text-sm",
                    i < take ? "bg-accent/10" : "opacity-55",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 tabular-nums text-xs text-subtle">
                      {i + 1}
                    </span>
                    <span className="font-kana text-lg leading-none">
                      {row.kana}
                    </span>
                  </span>
                  <span className="tabular-nums text-muted">
                    {row.t === null ? "miss" : `${row.t.toFixed(2)}s`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <Button
          onClick={() => {
            unlockSpeech();
            setSettings({ focusKeys: null });
            void navigate({ to: "/practice" });
          }}
        >
          Play again
        </Button>
        <Button
          variant="secondary"
          disabled={weak.length === 0}
          onClick={() => {
            unlockSpeech();
            setSettings({
              noRepeat,
              words: last.kind === "word",
              reviewOnly: false,
              focusKeys: weak,
              sessionMode: "count",
              countValue: take,
            });
            void navigate({ to: "/practice" });
          }}
        >
          Drill top {take || 5}
        </Button>
        <button
          type="button"
          role="switch"
          aria-checked={noRepeat}
          onClick={() => setNoRepeat((v) => !v)}
          className={cn(
            "flex min-h-11 items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm",
            noRepeat
              ? "border-accent bg-accent text-accent-fg"
              : "border-border bg-elevated text-fg",
          )}
        >
          <span>No repeats</span>
          <span
            className={cn(
              "h-5 w-9 shrink-0 rounded-full p-0.5",
              noRepeat ? "bg-accent-fg/25" : "bg-bg",
            )}
          >
            <span
              className={cn(
                "block size-4 rounded-full transition-transform duration-150",
                noRepeat
                  ? "translate-x-4 bg-accent-fg"
                  : "translate-x-0 bg-muted",
              )}
            />
          </span>
        </button>
        <Button variant="ghost" asChild>
          <Link to="/">Back to menu</Link>
        </Button>
      </div>
    </main>
  );
}
