import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scriptLabel } from "@/lib/kana";
import { type QuizAnswer } from "@/lib/quiz";
import { cn, speakJa } from "@/lib/utils";

interface ResultsPanelProps {
  answers: QuizAnswer[];
  summary: string;
  savedNote: string | null;
  onRetryMissed: () => void;
  onAgain: () => void;
  onHome: () => void;
}

export function ResultsPanel({
  answers,
  summary,
  savedNote,
  onRetryMissed,
  onAgain,
  onHome,
}: ResultsPanelProps) {
  const score = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  const missed = answers.filter((a) => !a.correct);

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="rounded-xl bg-surface px-6 py-10 text-center shadow-border">
        <Trophy className="mx-auto size-8 text-gold" />
        <p className="mt-3 text-sm font-medium tracking-[0.18em] text-muted uppercase">
          Drill complete
        </p>
        <p className="mt-2 font-serif text-6xl tabular-nums">{percent}%</p>
        <p className="mt-2 text-muted">
          {score} of {total} correct
        </p>
        <p className="mt-4 text-sm text-muted">{summary}</p>
        {savedNote && <p className="mt-2 text-sm text-moss">{savedNote}</p>}
      </div>

      {missed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg">Missed</h2>
          <ul className="divide-y divide-ink/8 overflow-hidden rounded-xl bg-surface shadow-border">
            {missed.map((item) => (
              <li
                key={item.question.id}
                className="flex items-center gap-4 px-4 py-3"
              >
                <button
                  type="button"
                  onClick={() => speakJa(item.question.glyph.kana)}
                  className="grid size-14 shrink-0 place-items-center rounded-lg bg-bg font-serif text-3xl"
                >
                  {item.question.glyph.kana}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {item.question.glyph.romaji}
                    <span className="ml-2 text-sm font-normal text-muted">
                      {scriptLabel(item.question.glyph.script)}
                    </span>
                  </p>
                  <p className="truncate text-sm text-muted">
                    {item.timedOut ? (
                      "Ran out of time"
                    ) : (
                      <>
                        You answered{" "}
                        <span className="text-primary">{item.given || "—"}</span>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {missed.length === 0 && (
        <p className="text-center text-moss">Clean run. Every character held.</p>
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          disabled={missed.length === 0}
          onClick={onRetryMissed}
        >
          <RotateCcw />
          Retry missed
        </Button>
        <Button type="button" variant="ink" onClick={onAgain}>
          New drill
        </Button>
        <Button type="button" variant="ghost" onClick={onHome}>
          Change lines
        </Button>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg">All answers</h2>
        <ol className="grid grid-cols-5 gap-2 sm:grid-cols-8">
          {answers.map((item) => (
            <li key={item.question.id}>
              <button
                type="button"
                title={`${item.question.glyph.kana} = ${item.question.glyph.romaji}`}
                onClick={() => speakJa(item.question.glyph.kana)}
                className={cn(
                  "grid aspect-square w-full place-items-center rounded-lg font-serif text-xl shadow-border",
                  item.correct ? "bg-moss/12 text-ink" : "bg-primary/12 text-ink",
                )}
              >
                {item.question.glyph.kana}
              </button>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
