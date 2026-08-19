import { useEffect, useRef, useState } from "react";
import { Check, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { matchesRomaji, scriptJa, scriptLabel } from "@/lib/kana";
import { type QuizAnswer, type QuizQuestion } from "@/lib/quiz";
import { cn, speakJa } from "@/lib/utils";

interface QuizSessionProps {
  questions: QuizQuestion[];
  summary: string;
  timerSeconds: number;
  onExit: () => void;
  onFinish: (answers: QuizAnswer[]) => void;
}

export function QuizSession({
  questions,
  summary,
  timerSeconds,
  onExit,
  onFinish,
}: QuizSessionProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [typed, setTyped] = useState("");
  const [verdict, setVerdict] = useState<QuizAnswer | null>(null);
  const [leftMs, setLeftMs] = useState(timerSeconds * 1000);
  const inputRef = useRef<HTMLInputElement>(null);
  const timedOutRef = useRef(false);

  const question = questions[index];
  const progress = questions.length === 0 ? 0 : index / questions.length;
  const timed = timerSeconds > 0;

  useEffect(() => {
    if (question?.kind === "read" && !verdict) {
      inputRef.current?.focus();
    }
  }, [question, verdict]);

  useEffect(() => {
    if (!verdict) return;
    if (!verdict.correct) return;
    const timer = window.setTimeout(() => advance(verdict), 750);
    return () => window.clearTimeout(timer);
  }, [verdict]);

  useEffect(() => {
    if (!timed || !question || verdict) return;
    timedOutRef.current = false;
    const started = Date.now();
    const total = timerSeconds * 1000;
    setLeftMs(total);

    const tick = () => {
      const left = Math.max(0, total - (Date.now() - started));
      setLeftMs(left);
      if (left <= 0 && !timedOutRef.current) {
        timedOutRef.current = true;
        setVerdict({
          question,
          given: "",
          correct: false,
          timedOut: true,
        });
      }
    };

    tick();
    const id = window.setInterval(tick, 50);
    return () => window.clearInterval(id);
  }, [question, timed, timerSeconds, verdict]);

  if (!question) {
    return (
      <div className="space-y-4">
        <p>No questions in this set.</p>
        <Button onClick={onExit}>Back</Button>
      </div>
    );
  }

  function grade(given: string) {
    if (verdict || !question) return;
    const correct =
      question.kind === "read"
        ? matchesRomaji(question.glyph, given)
        : given === question.glyph.kana;
    const next: QuizAnswer = { question, given, correct };
    setVerdict(next);
    if (correct) speakJa(question.glyph.kana);
  }

  function advance(current: QuizAnswer) {
    const nextAnswers = [...answers, current];
    if (index + 1 >= questions.length) {
      onFinish(nextAnswers);
      return;
    }
    setAnswers(nextAnswers);
    setIndex((i) => i + 1);
    setTyped("");
    setVerdict(null);
    timedOutRef.current = false;
  }

  const ratio = timed ? leftMs / (timerSeconds * 1000) : 1;
  const secondsLeft = Math.ceil(leftMs / 1000);
  const urgent = timed && !verdict && ratio <= 0.25;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <button
          type="button"
          onClick={onExit}
          className="underline-offset-4 hover:text-ink hover:underline"
        >
          Exit
        </button>
        <p className="hidden text-center sm:block">{summary}</p>
        <p className="tabular-nums">
          {index + 1} / {questions.length}
        </p>
      </div>

      <div className="space-y-2">
        <div className="h-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full bg-primary transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
          />
        </div>
        {timed && (
          <div className="flex items-center gap-3">
            <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-ink/10">
              <div
                className={cn(
                  "h-full origin-left",
                  urgent ? "bg-primary" : "bg-gold",
                )}
                style={{
                  width: `${Math.max(ratio * 100, 0)}%`,
                  transition: "width 50ms linear",
                }}
              />
            </div>
            <p
              className={cn(
                "w-10 text-right font-serif text-lg tabular-nums leading-none",
                urgent ? "text-primary" : "text-ink",
              )}
              aria-live="polite"
            >
              {verdict ? 0 : secondsLeft}
            </p>
          </div>
        )}
      </div>

      <div
        className={cn(
          "rounded-xl bg-surface px-5 py-10 text-center shadow-border sm:px-8 sm:py-14",
          verdict?.correct && "ring-2 ring-moss/50",
          verdict && !verdict.correct && "ring-2 ring-primary/50",
        )}
      >
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {question.kind === "read" ? "Read this" : "Find this reading"}
        </p>

        {question.kind === "read" ? (
          <p className="mt-4 font-serif text-7xl leading-none sm:text-8xl">
            {question.glyph.kana}
          </p>
        ) : (
          <p className="mt-4 font-serif text-6xl tracking-tight sm:text-7xl">
            {question.glyph.romaji}
          </p>
        )}

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => speakJa(question.glyph.kana)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-bg px-3.5 text-sm shadow-border hover:shadow-border-hover"
          >
            <Volume2 className="size-4" />
            Hear
          </button>
        </div>

        {verdict && (
          <div className="mt-6 flex flex-col items-center gap-1">
            <p
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium",
                verdict.correct ? "text-moss" : "text-primary",
              )}
            >
              {verdict.correct ? (
                <Check className="size-4" />
              ) : (
                <X className="size-4" />
              )}
              {verdict.correct
                ? "Correct"
                : verdict.timedOut
                  ? "Time’s up"
                  : "Not quite"}
            </p>
            <p className="font-serif text-xl">
              {question.glyph.kana}
              <span className="mx-2 text-muted">·</span>
              {question.glyph.romaji}
            </p>
            <p className="text-sm text-muted">
              {scriptLabel(question.glyph.script)} ·{" "}
              {scriptJa(question.glyph.script)}
            </p>
          </div>
        )}
      </div>

      {question.kind === "read" && !verdict && (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            grade(typed);
          }}
        >
          <Input
            ref={inputRef}
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Type romaji — shi, tsu, fu…"
            aria-label="Romaji reading"
          />
          <Button type="submit" className="w-full" size="lg" disabled={!typed.trim()}>
            Check
          </Button>
        </form>
      )}

      {question.kind === "write" && !verdict && (
        <div className="grid grid-cols-2 gap-3">
          {(question.choices ?? []).map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => grade(choice)}
              className="flex min-h-20 items-center justify-center rounded-xl bg-surface font-serif text-4xl shadow-border transition-[box-shadow,transform] duration-150 hover:shadow-border-hover"
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {verdict && (
        <Button
          type="button"
          className="w-full"
          size="lg"
          variant={verdict.correct ? "moss" : "ink"}
          onClick={() => advance(verdict)}
        >
          {index + 1 >= questions.length ? "See results" : "Next"}
        </Button>
      )}
    </div>
  );
}
