import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { unlockSpeech } from "@/lib/speech";
import { useKanaStore, type SessionMode, type VocabPrompt } from "@/lib/store";

const OPTION_LABELS = {
  touch: "Touch mode",
  words: "Word practice",
  handwritten: "Handwritten fonts",
  autoNext: "Auto next",
  noRepeat: "No repeats",
} as const;

export type OptionKey = keyof typeof OPTION_LABELS;

export function SessionSetup({
  pool,
  itemLabel,
  optionKeys,
  startDisabled,
  onStart,
  showQuizDirection = false,
}: {
  pool: number;
  itemLabel: string;
  optionKeys: OptionKey[];
  startDisabled?: boolean;
  onStart: () => void;
  showQuizDirection?: boolean;
}) {
  const settings = useKanaStore((s) => s.settings);
  const setSettings = useKanaStore((s) => s.setSettings);
  const setMode = (sessionMode: SessionMode) => setSettings({ sessionMode });

  return (
    <div className="mt-12">
      <div className="space-y-5">
        <div>
          <div className="mb-3 flex items-end justify-between gap-2">
            <h2 className="font-display text-2xl tracking-tight">Session</h2>
            <button
              type="button"
              className="text-xs text-muted hover:text-fg"
              onClick={() =>
                setSettings({
                  sessionMode: "count",
                  countValue: Math.max(1, pool),
                })
              }
            >
              Use all {pool}
            </button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              aria-pressed={settings.sessionMode === "count"}
              onClick={() => setMode("count")}
              className={cn(
                "flex min-h-11 flex-1 items-center justify-center rounded-full px-3 py-2 text-sm transition-colors duration-150",
                settings.sessionMode === "count"
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
              )}
            >
              {settings.sessionMode === "count" ? (
                <span className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={settings.countValue}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setSettings({
                        countValue: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                    className="w-14 rounded-sm bg-accent-fg/15 px-1 text-center tabular-nums outline-none"
                    aria-label={`Number of ${itemLabel.toLowerCase()}`}
                  />
                  <span>{itemLabel}</span>
                </span>
              ) : (
                <span>{itemLabel}</span>
              )}
            </button>
            <button
              type="button"
              aria-pressed={settings.sessionMode === "unlimited"}
              onClick={() => setMode("unlimited")}
              className={cn(
                "flex min-h-11 flex-1 items-center justify-center rounded-full px-3 py-2 text-sm transition-colors duration-150",
                settings.sessionMode === "unlimited"
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
              )}
            >
              Unlimited
            </button>
            <button
              type="button"
              aria-pressed={settings.sessionMode === "time"}
              onClick={() => setMode("time")}
              className={cn(
                "flex min-h-11 flex-1 items-center justify-center rounded-full px-3 py-2 text-sm transition-colors duration-150",
                settings.sessionMode === "time"
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
              )}
            >
              {settings.sessionMode === "time" ? (
                <span className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={settings.minutesValue}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setSettings({
                        minutesValue: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                    className="w-12 rounded-sm bg-accent-fg/15 px-1 text-center tabular-nums outline-none"
                    aria-label="Minutes"
                  />
                  <span>Minutes</span>
                </span>
              ) : (
                <span>Minutes</span>
              )}
            </button>
          </div>
        </div>

        {showQuizDirection ? (
          <div>
            <h2 className="mb-3 font-display text-xl tracking-tight">Quiz</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(
                [
                  ["kana", "See Japanese", "わたし → watashi", false],
                  ["meaning", "See meaning", "আমি → わたし", true],
                  ["listen", "Listen only", "sound → watashi", false],
                ] as const
              ).map(([id, title, hint, bn]) => {
                const on = settings.vocabPrompt === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSettings({ vocabPrompt: id as VocabPrompt })}
                    className={cn(
                      "flex min-h-11 flex-col items-center justify-center rounded-full px-3 py-2 text-sm transition-colors duration-150",
                      on
                        ? "bg-accent text-accent-fg"
                        : "border-border bg-elevated text-fg hover:border-fg/30",
                    )}
                  >
                    <span>{title}</span>
                    <span
                      className={cn(
                        "mt-0.5 text-xs",
                        bn && "font-bn",
                        on ? "text-accent-fg/70" : "text-subtle",
                      )}
                    >
                      {hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="mb-3 font-display text-xl tracking-tight">Options</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {optionKeys.map((key) => {
              const on = settings[key];
              return (
                <button
                  key={key}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => setSettings({ [key]: !on })}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-3 rounded-full px-3 py-2 text-sm transition-colors duration-150",
                    on
                      ? "bg-accent text-accent-fg"
                      : "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
                  )}
                >
                  <span>{OPTION_LABELS[key]}</span>
                  <span
                    className={cn(
                      "h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors duration-150",
                      on ? "bg-accent-fg/25" : "bg-bg",
                    )}
                  >
                    <span
                      className={cn(
                        "block size-4 rounded-full transition-transform duration-150",
                        on
                          ? "translate-x-4 bg-accent-fg"
                          : "translate-x-0 bg-muted",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 z-20 mt-10 flex flex-col items-center gap-2">
        <Button
          size="lg"
          className="min-w-48 shadow-lg"
          disabled={startDisabled}
          onClick={() => {
            unlockSpeech();
            onStart();
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
