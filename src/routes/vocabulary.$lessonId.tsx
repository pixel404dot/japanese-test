import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Languages, Layers, Printer, RotateCcw, Shuffle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogueCard } from "@/components/dialogue";
import { ReadAloudButton } from "@/components/read-aloud-button";
import { SessionSetup } from "@/components/session-setup";
import { SpeakButton } from "@/components/speak-button";
import { Spoiler } from "@/components/spoiler";
import { cn } from "@/lib/cn";
import { getDialogues, getLesson, wordMatches, type VocabWord } from "@/lib/vocab";
import { lessonScore } from "@/lib/srs";
import { unlockSpeech } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/vocabulary/$lessonId")({
  component: LessonPage,
});

function WordRow({
  word,
  showMeanings,
  active,
  rowId,
}: {
  word: VocabWord;
  showMeanings: boolean;
  active?: boolean;
  rowId: string;
}) {
  return (
    <li
      id={rowId}
      className={cn(
        "panel flex items-start gap-1 p-3",
        active && "shadow-[var(--shadow-border-hover)]",
      )}
    >
      <SpeakButton text={word.jp} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 pt-2">
            <p className="font-kana text-xl leading-none">{word.jp}</p>
            {word.kanji ? (
              <p className="mt-1 font-kana text-sm text-subtle print:hidden">{word.kanji}</p>
            ) : null}
          </div>
          <Spoiler>{word.romaji[0]}</Spoiler>
        </div>
        {showMeanings ? (
          <>
            <p className="mt-2 text-sm text-fg">{word.meaning}</p>
            <p className="mt-0.5 font-bn text-sm text-muted">{word.bn}</p>
            {word.note ? (
              <p className="mt-0.5 text-xs text-subtle">{word.note}</p>
            ) : null}
          </>
        ) : (
          <>
            <Spoiler variant="line" label="English meaning">
              {word.meaning}
            </Spoiler>
            <Spoiler variant="line" label="Bangla meaning" className="font-bn">
              {word.bn}
            </Spoiler>
            {word.note ? (
              <Spoiler variant="line" label="note" className="text-xs">
                {word.note}
              </Spoiler>
            ) : null}
          </>
        )}
      </div>
    </li>
  );
}

function LessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = getLesson(lessonId);
  const setSettings = useKanaStore((s) => s.setSettings);
  const showMeanings = useKanaStore((s) => s.settings.showVocabMeanings);
  const srs = useKanaStore((s) => s.vocabSrs);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [readIndex, setReadIndex] = useState(-1);

  useEffect(() => {
    setQuery("");
    setReadIndex(-1);
  }, [lessonId]);

  useEffect(() => {
    if (readIndex < 0) return;
    document
      .getElementById(`read-row-${readIndex}`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [readIndex]);

  if (!lesson) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">Lesson not found</p>
        <Button asChild variant="secondary">
          <Link to="/vocabulary">Back to vocabulary</Link>
        </Button>
      </main>
    );
  }

  const vocab = lesson.words.filter(
    (w) => w.kind !== "phrase" && wordMatches(w, query),
  );
  const phrases = lesson.words.filter(
    (w) => w.kind === "phrase" && wordMatches(w, query),
  );
  const empty = lesson.words.length === 0;
  const dialogues = getDialogues(lesson.id);
  const score = lessonScore(
    lesson.words.map((w) => w.jp),
    srs,
  );

  function startPractice(patch: Parameters<typeof setSettings>[0]) {
    unlockSpeech();
    setSettings({
      vocabLessonId: lessonId,
      words: true,
      reviewOnly: false,
      focusKeys: null,
      ...patch,
    });
    void navigate({ to: "/practice" });
  }

  return (
    <main className="page">
      <Link
        to="/vocabulary"
        className="back-link"
      >
        <ArrowLeft className="size-3.5" />
        Vocabulary
      </Link>

      {lesson.number > 0 ? (
        <p className="kicker mt-5">Lesson {lesson.number}</p>
      ) : lesson.id === "numerals" ? (
        <p className="kicker mt-5">Appendix</p>
      ) : null}
      <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{lesson.title}</h1>
      <p className="mt-1 font-display text-lg text-muted">{lesson.titleJa}</p>
      <p className="mt-2 text-sm text-muted">
        {lesson.words.length} words
        {score.known > 0 ? ` · ${score.known} known` : ""}
        {score.due > 0 ? ` · ${score.due} due` : ""}
      </p>

      {!empty ? (
        <div className="mt-6 grid grid-cols-3 gap-2">
          {(
            [
              {
                id: "quiz",
                label: "Quiz",
                icon: Layers,
                run: () =>
                  startPractice({ vocabPrompt: "kana", reviewOnly: false, touch: true }),
              },
              {
                id: "listen",
                label: "Listen",
                icon: Volume2,
                run: () =>
                  startPractice({ vocabPrompt: "listen", reviewOnly: false, touch: true }),
              },
              {
                id: "meaning",
                label: "Meaning",
                icon: Languages,
                run: () =>
                  startPractice({ vocabPrompt: "meaning", reviewOnly: false, touch: true }),
              },
              {
                id: "review",
                label: "Review",
                icon: RotateCcw,
                disabled: score.due === 0,
                run: () =>
                  startPractice({
                    reviewOnly: true,
                    noRepeat: true,
                    sessionMode: "count",
                    countValue: Math.max(1, score.due),
                  }),
              },
              { id: "shuffle", label: "Shuffle", icon: Shuffle, href: "shuffle" },
              { id: "print", label: "Print", icon: Printer, href: "print" },
            ] as const
          ).map((tile) => {
            const Icon = tile.icon;
            const className =
              "panel flex min-h-24 flex-col items-center justify-center gap-2 p-3 text-sm text-fg no-underline disabled:opacity-40";
            if ("href" in tile && tile.href === "shuffle") {
              return (
                <Link
                  key={tile.id}
                  to="/vocabulary/$lessonId/shuffle"
                  params={{ lessonId: lesson.id }}
                  className={className}
                >
                  <Icon className="size-6" />
                  {tile.label}
                </Link>
              );
            }
            if ("href" in tile && tile.href === "print") {
              return (
                <Link
                  key={tile.id}
                  to="/vocabulary/$lessonId/shuffle"
                  params={{ lessonId: lesson.id }}
                  hash="print"
                  className={className}
                >
                  <Icon className="size-6" />
                  {tile.label}
                </Link>
              );
            }
            return (
              <button
                key={tile.id}
                type="button"
                disabled={"disabled" in tile ? tile.disabled : false}
                onClick={() => "run" in tile && tile.run()}
                className={className}
              >
                <Icon className="size-6" />
                {tile.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="panel mt-4 p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Known</span>
          <span className="tabular-nums">{score.known}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-muted">Due</span>
          <span className="tabular-nums">{score.due}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-muted">Total</span>
          <span className="tabular-nums">{score.total}</span>
        </div>
      </div>

      {empty ? (
        <div className="panel mt-10 p-6">
          <p className="font-display text-xl tracking-tight">No words yet</p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 日本語, English, বাংলা"
              aria-label="Search words"
              className="field sm:max-w-xs"
            />
            <div className="flex flex-wrap gap-2">
              <ReadAloudButton
                words={[...vocab, ...phrases]}
                onCurrent={setReadIndex}
              />
              <Link
                to="/vocabulary/$lessonId/shuffle"
                params={{ lessonId: lesson.id }}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg no-underline shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <Shuffle className="size-4" />
                Shuffle page
              </Link>
              <Link
                to="/vocabulary/$lessonId/shuffle"
                params={{ lessonId: lesson.id }}
                hash="print"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg no-underline shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <Printer className="size-4" />
                Print
              </Link>
              <button
                type="button"
                onClick={() => setSettings({ showVocabMeanings: !showMeanings })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              >
                {showMeanings ? (
                  <>
                    <EyeOff className="size-4" />
                    Hide meanings
                  </>
                ) : (
                  <>
                    <Eye className="size-4" />
                    Show meanings
                  </>
                )}
              </button>
            </div>
          </div>
          {vocab.length > 0 ? (
            <section>
              <h2 className="mb-3 font-display text-xl tracking-tight">
                Vocabulary
              </h2>
              <ul className="space-y-2">
                {vocab.map((word, i) => (
                  <WordRow
                    key={`${word.jp}-${i}`}
                    word={word}
                    showMeanings={showMeanings}
                    active={readIndex === i}
                    rowId={`read-row-${i}`}
                  />
                ))}
              </ul>
            </section>
          ) : null}
          {phrases.length > 0 ? (
            <section>
              <h2 className="mb-3 font-display text-xl tracking-tight">
                Phrases
              </h2>
              <ul className="space-y-2">
                {phrases.map((word, i) => (
                  <WordRow
                    key={`${word.jp}-${i}`}
                    word={word}
                    showMeanings={showMeanings}
                    active={readIndex === vocab.length + i}
                    rowId={`read-row-${vocab.length + i}`}
                  />
                ))}
              </ul>
            </section>
          ) : null}
          {query && vocab.length === 0 && phrases.length === 0 ? (
            <p className="text-sm text-muted">No matches.</p>
          ) : null}
          {!query &&
            dialogues.map((d) => (
              <DialogueCard
                key={d.title}
                dialogue={d}
                showMeanings={showMeanings}
              />
            ))}
        </div>
      )}

      <SessionSetup
        pool={lesson.words.length}
        itemLabel="Words"
        optionKeys={["touch", "handwritten", "autoNext", "noRepeat"]}
        showQuizDirection
        startDisabled={empty}
        onStart={() => {
          setSettings({
            vocabLessonId: lesson.id,
            words: true,
            reviewOnly: false,
            focusKeys: null,
          });
          void navigate({ to: "/practice" });
        }}
      />
    </main>
  );
}
