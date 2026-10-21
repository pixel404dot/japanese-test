import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Pause, Play } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { JpRuby } from "@/components/jp-ruby";
import { SpeakButton } from "@/components/speak-button";
import { Spoiler } from "@/components/spoiler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { getReadingLesson, type ReadingLine } from "@/lib/reading";
import { speakJapanese, stopSpeech, type Voice } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/reading/$lessonId")({
  component: ReadingLessonPage,
});

function Meanings({
  line,
  open,
}: {
  line: ReadingLine;
  open: boolean;
}) {
  return open ? (
    <>
      <p className="mt-1 text-sm text-fg">{line.meaning}</p>
      <p className="mt-0.5 font-bn text-sm text-muted">{line.bn}</p>
      {line.note ? <p className="mt-0.5 text-xs text-subtle">{line.note}</p> : null}
    </>
  ) : (
    <>
      <Spoiler variant="line" label="English meaning">
        {line.meaning}
      </Spoiler>
      <Spoiler variant="line" label="Bangla meaning" className="font-bn">
        {line.bn}
      </Spoiler>
      {line.note ? (
        <Spoiler variant="line" label="note" className="text-xs">
          {line.note}
        </Spoiler>
      ) : null}
    </>
  );
}

function LineBlock({
  line,
  voice,
  open,
  active,
  reply,
}: {
  line: ReadingLine;
  voice?: Voice;
  open: boolean;
  active?: boolean;
  reply?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-1 rounded-xl p-1",
        active && "bg-accent/10",
        reply && "pl-4",
      )}
    >
      <SpeakButton text={line.speak} voice={voice} className="size-9" />
      <div className="min-w-0 flex-1 pt-1.5">
        <p className="font-kana text-lg leading-snug">
          <JpRuby parts={line.parts} />
        </p>
        <div className="mt-1">
          <Spoiler>{line.romaji}</Spoiler>
        </div>
        <Meanings line={line} open={open} />
      </div>
    </div>
  );
}

function PlayToggle({
  playing,
  onClick,
  label,
}: {
  playing: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
    >
      {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      {playing ? "Stop" : label}
    </button>
  );
}

function ReadingLessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = getReadingLesson(lessonId);
  const showMeanings = useKanaStore((s) => s.settings.showVocabMeanings);
  const setSettings = useKanaStore((s) => s.setSettings);
  const [playing, setPlaying] = useState<"patterns" | "examples" | "convo" | null>(
    null,
  );
  const [active, setActive] = useState<string | null>(null);
  const cancel = useRef(false);

  useEffect(() => {
    return () => {
      cancel.current = true;
      stopSpeech();
    };
  }, []);

  if (!lesson) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">Lesson not found</p>
        <Button asChild variant="secondary">
          <Link to="/reading">Back to reading</Link>
        </Button>
      </main>
    );
  }

  const stop = () => {
    cancel.current = true;
    stopSpeech();
    setPlaying(null);
    setActive(null);
  };

  const playQueue = async (
    key: "patterns" | "examples" | "convo",
    items: { id: string; speak: string; voice?: Voice }[],
  ) => {
    if (playing === key) {
      stop();
      return;
    }
    cancel.current = false;
    setPlaying(key);
    for (const item of items) {
      if (cancel.current) break;
      setActive(item.id);
      await speakJapanese(item.speak, item.voice);
      if (cancel.current) break;
      await new Promise((r) => setTimeout(r, 320));
    }
    setPlaying(null);
    setActive(null);
  };

  const patternQueue = lesson.patterns.map((p) => ({
    id: `p-${p.n}`,
    speak: p.line.speak,
  }));
  const exampleQueue = lesson.examples.flatMap((ex) =>
    ex.lines.map((line, i) => ({ id: `e-${ex.n}-${i}`, speak: line.speak })),
  );
  const convoQueue = lesson.conversation.lines.map((line, i) => ({
    id: `c-${i}`,
    speak: line.line.speak,
    voice: line.voice,
  }));

  return (
    <main className="page">
      <Link
        to="/reading"
        className="back-link"
      >
        <ArrowLeft className="size-4" />
        Reading
      </Link>
      <p className="kicker mt-5">
        Lesson {lesson.number}
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{lesson.title}</h1>
      <p className="mt-1 font-display text-lg text-muted">{lesson.titleJa}</p>
      <p className="mt-2 text-sm text-muted">{lesson.description}</p>

      <div className="mt-5">
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

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl tracking-tight">文型</h2>
            <p className="mt-0.5 text-sm text-muted">Sentence patterns</p>
          </div>
          <PlayToggle
            playing={playing === "patterns"}
            onClick={() => void playQueue("patterns", patternQueue)}
            label="Play patterns"
          />
        </div>
        <ol className="space-y-2">
          {lesson.patterns.map((p) => (
            <li key={p.n} className="panel p-3">
              <p className="kicker">
                {p.n}
              </p>
              <LineBlock
                line={p.line}
                open={showMeanings}
                active={active === `p-${p.n}`}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl tracking-tight">例文</h2>
            <p className="mt-0.5 text-sm text-muted">Example sentences</p>
          </div>
          <PlayToggle
            playing={playing === "examples"}
            onClick={() => void playQueue("examples", exampleQueue)}
            label="Play examples"
          />
        </div>
        <ol className="space-y-3">
          {lesson.examples.map((ex) => (
            <li key={ex.n} className="panel p-3">
              <p className="kicker">
                {ex.n}
              </p>
              <div className="mt-1 space-y-1">
                {ex.lines.map((line, i) => (
                  <LineBlock
                    key={`${ex.n}-${i}`}
                    line={line}
                    open={showMeanings}
                    active={active === `e-${ex.n}-${i}`}
                    reply={i > 0}
                  />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl tracking-tight">会話</h2>
            <p className="mt-0.5 font-kana text-sm text-muted">
              {lesson.conversation.titleJa}
            </p>
            <p className="text-sm text-muted">
              {lesson.conversation.title}
              {lesson.conversation.cd ? ` · ${lesson.conversation.cd}` : ""}
            </p>
            {lesson.conversation.setting ? (
              <p className="mt-1 max-w-sm text-xs text-subtle">
                {lesson.conversation.setting}
              </p>
            ) : null}
          </div>
          <PlayToggle
            playing={playing === "convo"}
            onClick={() => void playQueue("convo", convoQueue)}
            label="Play conversation"
          />
        </div>
        <ul className="space-y-2">
          {lesson.conversation.lines.map((row, i) => {
            const guest = row.speaker === "ミラー" || row.speaker === "サントス";
            return (
              <Fragment key={`c-${i}`}>
                {row.sceneBreak ? (
                  <li className="list-none py-3" aria-hidden>
                    <div className="mx-10 border-t border-dashed border-border" />
                  </li>
                ) : null}
                <li
                  className={cn(
                    "flex",
                    guest ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[92%] rounded-xl border px-3 py-2 sm:max-w-[80%]",
                      active === `c-${i}`
                        ? "border-accent bg-accent/10"
                        : "border-border bg-surface",
                    )}
                  >
                    <p className="font-kana text-[11px] tracking-wider text-subtle">
                      {row.speakerRuby ? (
                        <JpRuby parts={row.speakerRuby} />
                      ) : (
                        row.speaker
                      )}
                    </p>
                    <div className="mt-1 flex items-start gap-1">
                      <SpeakButton
                        text={row.line.speak}
                        voice={row.voice}
                        className="size-9"
                      />
                      <div className="min-w-0 pt-1.5">
                        <p className="font-kana text-lg leading-snug">
                          <JpRuby parts={row.line.parts} />
                        </p>
                        <div className="mt-1">
                          <Spoiler>{row.line.romaji}</Spoiler>
                        </div>
                        <Meanings line={row.line} open={showMeanings} />
                      </div>
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
