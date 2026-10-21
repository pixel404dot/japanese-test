import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CircleHelp, Volume2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SpeakButton } from "@/components/speak-button";
import { cn } from "@/lib/cn";
import { charsForGroups, similarKana, lookupKana, yoonTitlesIn, ALL_GROUPS } from "@/lib/kana";
import {
  applyStat,
  pickNext,
  shuffleNoRepeat,
  type PromptItem,
} from "@/lib/progress";
import { useKanaStore } from "@/lib/store";
import { getLesson } from "@/lib/vocab";
import { KANJI_ITEMS, KANJI_LESSON_ID, kanjiAnswers, kanjiSpeak } from "@/lib/kanji";
import { SINGLE_KANJI, SINGLE_KANJI_LESSON_ID } from "@/lib/kanji-n5";
import { isDue } from "@/lib/srs";
import { WORDS } from "@/lib/words";
import { speakJapanese, stopSpeech, unlockSpeech } from "@/lib/speech";

export const Route = createFileRoute("/practice")({ component: PracticePage });

function wordsMatching(groupIds: string[]) {
  const titles = new Set(
    ALL_GROUPS.filter((g) => groupIds.includes(g.id)).map((g) => g.title),
  );
  return WORDS.filter((w) => {
    const yoon = yoonTitlesIn(w.k);
    const rows = [...w.hg, ...w.kg];
    const needed = yoon.length
      ? [...rows.filter((x) => x !== "や" && x !== "ヤ"), ...yoon]
      : rows;
    return needed.length !== 0 && needed.every((x) => titles.has(x));
  });
}

function distractors(
  pool: PromptItem[],
  current: PromptItem,
  n = 5,
  field: "romaji" | "jp" = "romaji",
): string[] {
  const correct = field === "jp" ? current.jp : current.answers[0];
  const set = new Set([correct]);
  const rest = [...pool.filter((p) => p.jp !== current.jp)].sort(
    () => Math.random() - 0.5,
  );
  for (const item of rest) {
    if (set.size >= n) break;
    const a = field === "jp" ? item.jp : item.answers[0];
    if (a) set.add(a);
  }
  return [...set].sort(() => Math.random() - 0.5);
}

function norm(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\s~\-ー・。、'’]/g, "");
}

function answersMatch(answers: string[], typed: string) {
  const t = norm(typed);
  return answers.some((a) => norm(a) === t);
}

function formatTime(sec: number) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
}

function PracticePage() {
  const navigate = useNavigate();
  const settings = useKanaStore((s) => s.settings);
  const stats = useKanaStore((s) => s.stats);
  const setStats = useKanaStore((s) => s.setStats);
  const setLastSession = useKanaStore((s) => s.setLastSession);
  const setSettings = useKanaStore((s) => s.setSettings);
  const applySrs = useKanaStore((s) => s.applySrs);
  const srsSnapshot = useRef(useKanaStore.getState().vocabSrs);

  const vocabPrompt = settings.vocabLessonId
    ? settings.vocabPrompt
    : "kana";
  const meaningQuiz = vocabPrompt === "meaning";
  const listenQuiz = vocabPrompt === "listen";
  const hideKana = meaningQuiz || listenQuiz;

  const pool = useMemo<PromptItem[]>(() => {
    let items: PromptItem[];
    if (settings.vocabLessonId) {
      const kanjiLesson =
        settings.vocabLessonId === KANJI_LESSON_ID
          ? { id: KANJI_LESSON_ID, words: KANJI_ITEMS }
          : settings.vocabLessonId === SINGLE_KANJI_LESSON_ID
            ? { id: SINGLE_KANJI_LESSON_ID, words: SINGLE_KANJI }
            : null;
      if (kanjiLesson) {
        const words = kanjiLesson.words.filter((w) =>
          settings.reviewOnly
            ? isDue(srsSnapshot.current[`${kanjiLesson.id}-${w.n}`])
            : true,
        );
        items = words.map((w) => ({
          key: `${kanjiLesson.id}-${w.n}`,
          jp: w.kanji,
          answers: kanjiAnswers(w),
          meaning: w.meaning,
          meaningBn: w.bn,
          kind: "word" as const,
          speak: kanjiSpeak(w),
        }));
      } else {
        const lesson = getLesson(settings.vocabLessonId);
        const words = (lesson?.words ?? []).filter((w) =>
          settings.reviewOnly ? isDue(srsSnapshot.current[w.jp]) : true,
        );
        items = words.map((w) => ({
          key: w.jp,
          jp: w.jp,
          answers: w.romaji,
          meaning: w.meaning,
          meaningBn: w.bn,
          kind: "word" as const,
        }));
      }
    } else if (settings.words) {
      items = wordsMatching(settings.groupIds).map((w) => ({
        key: w.k,
        jp: w.k,
        answers: w.r,
        meaning: w.m,
        kind: "word" as const,
      }));
    } else {
      items = charsForGroups(settings.groupIds).map((c) => ({
        key: `${c.groupId}:${c.k}`,
        jp: c.k,
        answers: c.r,
        kind: "kana" as const,
      }));
    }
    const focus = settings.focusKeys;
    if (focus && focus.length > 0) {
      const allow = new Set(focus);
      items = items.filter((p) => allow.has(p.key) || allow.has(p.jp));
    }
    return items;
  }, [
    settings.groupIds,
    settings.words,
    settings.vocabLessonId,
    settings.reviewOnly,
    settings.focusKeys,
  ]);

  const [current, setCurrent] = useState<PromptItem | null>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(0);
  const [shake, setShake] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number | null>(
    settings.sessionMode === "time" ? settings.minutesValue * 60 : null,
  );
  const [ended, setEnded] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const answeredRef = useRef(false);
  const lastWrongRef = useRef("");
  const missedRef = useRef(false);
  const requeuedRef = useRef(new Set<string>());
  const statsRef = useRef(stats);
  const deckRef = useRef<PromptItem[]>([]);
  const sessionRef = useRef({
    right: 0,
    wrong: 0,
    help: 0,
    timeSum: 0,
    startedAt: Date.now(),
    perKey: {} as Record<string, { right: number; wrong: number; timeSum: number }>,
  });
  const shownAtRef = useRef(Date.now());

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const finish = useCallback(() => {
    if (ended) return;
    setEnded(true);
    stopSpeech();
    const kind = pool[0]?.kind ?? "kana";
    setLastSession({ ...sessionRef.current, kind });
    setSettings({
      vocabLessonId: settings.vocabLessonId,
      reviewOnly: false,
      focusKeys: null,
    });
    void navigate({ to: "/results" });
  }, [ended, navigate, pool, setLastSession, setSettings, settings.vocabLessonId]);

  const next = useCallback(
    (prev: PromptItem | null) => {
      if (pool.length === 0) return;
      let item: PromptItem | undefined;
      if (settings.noRepeat) {
        item = deckRef.current.shift();
        if (!item) {
          finish();
          return;
        }
      } else {
        item = pickNext(pool, prev);
      }
      setCurrent(item);
      setTyped("");
      setRevealed(false);
      setShowMeaning(false);
      setPrintMode(false);
      answeredRef.current = false;
      lastWrongRef.current = "";
      missedRef.current = false;
      shownAtRef.current = Date.now();
      if (settings.touch) {
        setChoices(
          distractors(pool, item, 5, meaningQuiz ? "jp" : "romaji"),
        );
      }
      statsRef.current = applyStat(statsRef.current, item.jp, "shown");
      setStats(statsRef.current);
      queueMicrotask(() => {
        inputRef.current?.focus();
        if (listenQuiz) {
          unlockSpeech();
          void speakJapanese(item.speak ?? item.jp);
        }
      });
    },
    [pool, settings.noRepeat, settings.touch, setStats, finish, meaningQuiz, listenQuiz],
  );

  useEffect(() => {
    if (pool.length === 0) return;
    sessionRef.current = {
      right: 0,
      wrong: 0,
      help: 0,
      timeSum: 0,
      startedAt: Date.now(),
      perKey: {},
    };
    deckRef.current = settings.noRepeat ? shuffleNoRepeat(pool) : [];
    requeuedRef.current = new Set();
    next(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length]);

  useEffect(() => () => stopSpeech(), []);

  useEffect(() => {
    const kick = () => unlockSpeech();
    window.addEventListener("pointerdown", kick);
    window.addEventListener("touchstart", kick, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("touchstart", kick);
    };
  }, []);

  useEffect(() => {
    if (settings.sessionMode !== "time" || remaining === null || ended) return;
    if (remaining <= 0) {
      finish();
      return;
    }
    const id = window.setInterval(() => {
      setRemaining((s) => (s === null ? s : Math.max(0, s - 1)));
    }, 1000);
    return () => window.clearInterval(id);
  }, [settings.sessionMode, remaining, ended, finish]);

  const missCurrent = (jp: string) => {
    if (!settings.vocabLessonId) return;
    missedRef.current = true;
    applySrs(jp, false);
    if (settings.noRepeat && current && !requeuedRef.current.has(jp)) {
      requeuedRef.current.add(jp);
      deckRef.current.push(current);
    }
  };

  const onCorrect = useCallback(() => {
    if (!current || answeredRef.current) return;
    answeredRef.current = true;
    const elapsed = Date.now() - shownAtRef.current;
    statsRef.current = applyStat(statsRef.current, current.jp, "correct", elapsed);
    setStats(statsRef.current);
    sessionRef.current.right += 1;
    sessionRef.current.timeSum += Math.min(elapsed, 10_000);
    const pk = sessionRef.current.perKey[current.jp] ?? {
      right: 0,
      wrong: 0,
      timeSum: 0,
    };
    pk.right += 1;
    pk.timeSum += Math.min(elapsed, 10_000);
    sessionRef.current.perKey[current.jp] = pk;
    if (settings.vocabLessonId && !missedRef.current) applySrs(current.key, true);
    const n = done + 1;
    setDone(n);
    const isWord = current.kind === "word";
    if (isWord) setShowMeaning(true);
    if (settings.sessionMode === "count" && n >= settings.countValue) {
      window.setTimeout(finish, isWord ? 4000 : 220);
      return;
    }
    if (isWord && !settings.autoNext) {
      answeredRef.current = false;
      return;
    }
    window.setTimeout(() => next(current), isWord ? 4000 : 180);
  }, [current, done, finish, next, setStats, settings, applySrs]);

  const onWrong = useCallback(() => {
    if (!current) return;
    statsRef.current = applyStat(statsRef.current, current.jp, "wrong");
    setStats(statsRef.current);
    sessionRef.current.wrong += 1;
    const pk = sessionRef.current.perKey[current.jp] ?? {
      right: 0,
      wrong: 0,
      timeSum: 0,
    };
    pk.wrong += 1;
    sessionRef.current.perKey[current.jp] = pk;
    missCurrent(current.key);
    setShake(true);
    window.setTimeout(() => setShake(false), 280);
  }, [current, setStats]);

  const onType = (value: string) => {
    if (!current || answeredRef.current || showMeaning) return;
    if (value.length < typed.length) {
      statsRef.current = applyStat(statsRef.current, current.jp, "edit");
      setStats(statsRef.current);
    }
    setTyped(value);
    const t = value.trim().toLowerCase();
    const minLen = Math.min(...current.answers.map((a) => norm(a).length));
    const match = answersMatch(current.answers, value);
    if (norm(t).length >= minLen && !match && lastWrongRef.current !== t) {
      statsRef.current = applyStat(
        statsRef.current,
        current.jp,
        "wrongSubmission",
      );
      setStats(statsRef.current);
      lastWrongRef.current = t;
      missCurrent(current.key);
    }
    if (match) onCorrect();
  };

  const reveal = () => {
    if (!current || revealed) return;
    setRevealed(true);
    statsRef.current = applyStat(statsRef.current, current.jp, "help");
    setStats(statsRef.current);
    sessionRef.current.help += 1;
    missCurrent(current.key);
  };

  useEffect(() => {
    if (settings.touch) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish();
      } else if (e.key === "?") {
        e.preventDefault();
        reveal();
      } else if (e.key === "Shift") {
        setPrintMode(true);
        window.setTimeout(() => setPrintMode(false), 1500);
      } else if (e.key === "Enter" && showMeaning) {
        next(current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.touch, finish, showMeaning, current]);

  if (pool.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">Nothing to drill</p>
        <p className="text-sm text-muted">
          {settings.reviewOnly
            ? "Nothing is due. Drill a lesson first, then come back."
            : "Pick at least one row, or add words to a vocabulary lesson."}
        </p>
        <Button asChild>
          <Link to={settings.vocabLessonId === KANJI_LESSON_ID ? "/kanji" : settings.vocabLessonId ? "/vocabulary" : "/"}>Back</Link>
        </Button>
      </div>
    );
  }

  const similar = current ? similarKana(current.jp) : [];
  const timeRatio =
    settings.sessionMode === "time" && remaining !== null
      ? remaining / (settings.minutesValue * 60)
      : 1;
  const goal =
    settings.sessionMode === "count"
      ? settings.noRepeat
        ? Math.min(settings.countValue, pool.length)
        : settings.countValue
      : settings.noRepeat
        ? pool.length
        : null;

  return (
    <div className="flex min-h-[calc(100dvh-4.25rem)] flex-col">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-20 font-display text-2xl tabular-nums tracking-tight">
          {done}
          {goal === null ? null : (
            <span className="text-base text-muted"> / {goal}</span>
          )}
        </div>
        {remaining === null ? (
          <div className="hidden items-center gap-4 text-xs text-subtle sm:flex">
            <span>
              <kbd className="rounded-xs border border-border px-1">?</kbd> help
            </span>
            {settings.handwritten ? (
              <span>
                <kbd className="rounded-xs border border-border px-1">shift</kbd>{" "}
                print
              </span>
            ) : null}
            <span>
              <kbd className="rounded-xs border border-border px-1">esc</kbd> end
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "font-mono text-2xl tabular-nums",
              timeRatio <= 0.1
                ? "text-bad"
                : timeRatio <= 0.25
                  ? "text-warn"
                  : "text-fg",
            )}
          >
            {formatTime(remaining)}
          </div>
        )}
        <button
          type="button"
          onClick={finish}
          aria-label="End session"
          className="grid size-11 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10">
        <div className="flex flex-col items-center text-center">
          {hideKana && !showMeaning && !revealed ? (
            listenQuiz ? (
              <button
                type="button"
                onClick={() => {
                  unlockSpeech();
                  if (current) void speakJapanese(current.speak ?? current.jp);
                }}
                aria-label="Play again"
                className={cn(
                  "kana-pop grid size-24 place-items-center rounded-full border border-border bg-elevated text-fg hover:border-fg/30",
                  shake && "kana-shake text-bad",
                )}
              >
                <Volume2 className="size-10" />
              </button>
            ) : (
              <div className={cn("kana-pop px-2", shake && "kana-shake")}>
                <p className="font-bn text-[9vw] leading-tight text-fg sm:text-5xl">
                  {current?.meaningBn ?? current?.meaning}
                </p>
                {current?.meaningBn && current?.meaning ? (
                  <p className="mt-3 text-lg text-muted">{current.meaning}</p>
                ) : null}
              </div>
            )
          ) : (
            <button
              type="button"
              onClick={() => {
                setPrintMode(true);
                window.setTimeout(() => setPrintMode(false), 1500);
              }}
              className={cn(
                "kana-pop select-none text-fg",
                settings.handwritten && !printMode ? "font-hand" : "font-kana",
                shake && "kana-shake text-bad",
              )}
            >
              <span
                className={cn(
                  "block leading-none",
                  current && current.jp.length > 4
                    ? "text-[14vw] sm:text-7xl"
                    : current && current.jp.length > 1
                      ? "text-[22vw] sm:text-[7.5rem]"
                      : "text-[28vw] sm:text-8xl",
                )}
              >
                {current?.jp ?? ""}
              </span>
            </button>
          )}
          {current && (!hideKana || showMeaning || revealed) ? (
            <SpeakButton text={current.speak ?? current.jp} className="mt-3" />
          ) : listenQuiz && current ? (
            <p className="mt-4 text-sm text-muted">Listen, then type romaji</p>
          ) : null}
        </div>

        {revealed && current ? (
          <div className="mt-4 text-center">
            <p className="font-display text-2xl text-muted">
              {current.answers[0]}
            </p>
            {!meaningQuiz && current.meaning ? (
              <p className="mt-2 text-base text-muted">{current.meaning}</p>
            ) : null}
            {!meaningQuiz && current.meaningBn ? (
              <p className="mt-1 font-bn text-base text-subtle">
                {current.meaningBn}
              </p>
            ) : null}
            {similar.length > 0 ? (
              <p className="mt-2 text-sm text-subtle">
                Similar{" "}
                {similar.map((k) => {
                  const info = lookupKana(k);
                  return (
                    <span key={k} className="mx-1 font-kana text-fg">
                      {k}
                      {info ? (
                        <span className="ml-1 font-sans text-subtle">
                          {info.romaji}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </p>
            ) : null}
          </div>
        ) : null}

        {showMeaning && current && !revealed ? (
          <div className="mt-3 text-center">
            {meaningQuiz ? (
              <>
                <p className="font-display text-xl text-muted">
                  {current.answers[0]}
                </p>
                {current.meaning ? (
                  <p className="mt-2 text-sm text-subtle">{current.meaning}</p>
                ) : null}
              </>
            ) : (
              <>
                {current.meaning ? (
                  <p className="text-lg text-muted">{current.meaning}</p>
                ) : null}
                {current.meaningBn ? (
                  <p className="mt-1 font-bn text-base text-subtle">
                    {current.meaningBn}
                  </p>
                ) : null}
              </>
            )}
          </div>
        ) : null}

        {revealed || (showMeaning && !settings.autoNext) ? (
          <Button className="mt-8" onClick={() => next(current)}>
            Next
          </Button>
        ) : showMeaning ? null : settings.touch ? (
          <div
            className={cn(
              "mt-10 w-full max-w-xl gap-2 px-1",
              meaningQuiz
                ? "grid grid-cols-1 sm:grid-cols-2"
                : "grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center",
            )}
          >
            {choices.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  unlockSpeech();
                  const ok = meaningQuiz
                    ? c === current?.jp
                    : Boolean(current?.answers.includes(c));
                  if (ok) onCorrect();
                  else onWrong();
                }}
                className={cn(
                  "min-h-16 rounded-xl bg-elevated px-2 py-2 text-center leading-snug break-all shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
                  meaningQuiz
                    ? "font-kana text-xl"
                    : "text-sm sm:min-w-28 sm:flex-1 sm:text-base",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        ) : (
          <input
            ref={inputRef}
            value={typed}
            onChange={(e) => onType(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Romaji answer"
            className="mt-8 w-full max-w-xs border-0 border-b border-border bg-transparent text-center font-display text-3xl tracking-wide text-fg outline-none focus:border-accent"
            placeholder="romaji"
          />
        )}

        {showMeaning || revealed ? null : (
          <button
            type="button"
            onClick={reveal}
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-subtle hover:text-muted"
          >
            <CircleHelp className="size-4" />
            Reveal
          </button>
        )}
      </div>
    </div>
  );
}
