import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SetupPanel } from "@/components/setup-panel";
import { QuizSession } from "@/components/quiz-session";
import { ResultsPanel } from "@/components/results-panel";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  DEFAULT_SETUP,
  LOCAL_SESSIONS_KEY,
  LOCAL_STATS_KEY,
  SETUP_STORAGE_KEY,
  type SetupState,
  clampTimer,
} from "@/lib/kana";
import { savePracticeSession } from "@/lib/progress";
import {
  buildQuiz,
  describeSetup,
  type QuizAnswer,
  type QuizQuestion,
} from "@/lib/quiz";

export const Route = createFileRoute("/")({ component: Home });

type View = "setup" | "quiz" | "results";

function Home() {
  const { user } = useCurrentUserState();
  const [setup, setSetup] = useState<SetupState>(DEFAULT_SETUP);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETUP_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SetupState>;
        setSetup({
          ...DEFAULT_SETUP,
          ...parsed,
          rows: Array.isArray(parsed.rows) ? parsed.rows : DEFAULT_SETUP.rows,
          timer: clampTimer(parsed.timer ?? 0),
        });
      }
    } catch {
      /* keep default */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setup));
  }, [setup, hydrated]);

  const summary = useMemo(() => describeSetup(setup), [setup]);

  function startWith(nextQuestions: QuizQuestion[]) {
    if (nextQuestions.length === 0) return;
    setQuestions(nextQuestions);
    setAnswers([]);
    setSavedNote(null);
    setView("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFinish(nextAnswers: QuizAnswer[]) {
    setAnswers(nextAnswers);
    setView("results");
    persistProgress(nextAnswers, Boolean(user), setup)
      .then((note) => setSavedNote(note))
      .catch(() => setSavedNote("Could not save this session."));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {view === "setup" && (
        <SetupPanel
          setup={setup}
          onChange={setSetup}
          onStart={() => startWith(buildQuiz(setup))}
        />
      )}
      {view === "quiz" && (
        <QuizSession
          questions={questions}
          summary={summary}
          timerSeconds={setup.timer}
          onExit={() => setView("setup")}
          onFinish={handleFinish}
        />
      )}
      {view === "results" && (
        <ResultsPanel
          answers={answers}
          summary={summary}
          savedNote={savedNote}
          onRetryMissed={() => {
            const missed = answers
              .filter((a) => !a.correct)
              .map((a, i) => ({
                ...a.question,
                id: `${a.question.id}-retry-${i}`,
              }));
            startWith(missed);
          }}
          onAgain={() => startWith(buildQuiz(setup))}
          onHome={() => setView("setup")}
        />
      )}
    </main>
  );
}

async function persistProgress(
  answers: QuizAnswer[],
  signedIn: boolean,
  setup: SetupState,
): Promise<string> {
  const score = answers.filter((a) => a.correct).length;
  const payload = {
    script: setup.script,
    lines: setup.rows.join(","),
    mode: setup.mode,
    score,
    total: answers.length,
    answers: answers.map((a) => ({
      kana: a.question.glyph.kana,
      script: a.question.glyph.script,
      correct: a.correct,
    })),
  };

  writeLocalProgress(payload, answers);

  if (!signedIn) {
    return "Saved on this device. Sign in to keep progress across browsers.";
  }

  await savePracticeSession({ data: payload });
  return "Saved to your account.";
}

function writeLocalProgress(
  payload: {
    script: string;
    lines: string;
    mode: string;
    score: number;
    total: number;
  },
  answers: QuizAnswer[],
) {
  try {
    const sessions = readJson<unknown[]>(LOCAL_SESSIONS_KEY, []);
    sessions.unshift({
      ...payload,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(
      LOCAL_SESSIONS_KEY,
      JSON.stringify(sessions.slice(0, 20)),
    );

    const stats = readJson<
      Record<string, { kana: string; script: string; correct: number; attempts: number }>
    >(LOCAL_STATS_KEY, {});
    for (const answer of answers) {
      const key = `${answer.question.glyph.script}:${answer.question.glyph.kana}`;
      const prev = stats[key] ?? {
        kana: answer.question.glyph.kana,
        script: answer.question.glyph.script,
        correct: 0,
        attempts: 0,
      };
      prev.attempts += 1;
      if (answer.correct) prev.correct += 1;
      stats[key] = prev;
    }
    localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
  } catch {
    /* private mode */
  }
}

function readJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return JSON.parse(raw) as T;
}
