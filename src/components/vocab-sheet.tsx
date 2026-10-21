import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, ListOrdered, Printer, Shuffle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ReadAloudButton } from "@/components/read-aloud-button";
import { TextbookPage } from "@/components/textbook-page";
import { Button } from "@/components/ui/button";
import { useKanaStore } from "@/lib/store";
import { stopSpeech } from "@/lib/speech";
import { getLesson, shuffleList } from "@/lib/vocab";

export function VocabSheet({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId);
  const showMeanings = useKanaStore((s) => s.settings.showVocabMeanings);
  const setSettings = useKanaStore((s) => s.setSettings);
  const [shuffleN, setShuffleN] = useState(0);
  const [readIndex, setReadIndex] = useState(-1);

  useEffect(() => {
    setShuffleN(0);
    setReadIndex(-1);
  }, [lessonId]);

  useEffect(() => {
    if (readIndex < 0) return;
    document
      .getElementById(`read-row-${readIndex}`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [readIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#print") return;
    const id = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(id);
  }, []);

  const vocab = useMemo(() => {
    if (!lesson) return [];
    const list = lesson.words.filter((w) => w.kind !== "phrase");
    return shuffleN > 0 ? shuffleList(list) : list;
  }, [lesson, shuffleN]);

  const phrases = useMemo(() => {
    if (!lesson) return [];
    const list = lesson.words.filter((w) => w.kind === "phrase");
    return shuffleN > 0 ? shuffleList(list) : list;
  }, [lesson, shuffleN]);

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

  return (
    <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 print:max-w-none print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/vocabulary/$lessonId"
          params={{ lessonId: lesson.id }}
          className="inline-flex items-center gap-1.5 text-sm text-muted no-underline hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Back to lesson
        </Link>
        <div className="flex flex-wrap gap-2">
          <ReadAloudButton
            words={[...vocab, ...phrases]}
            onCurrent={setReadIndex}
          />
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              setReadIndex(-1);
              setShuffleN((n) => n + 1);
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <Shuffle className="size-4" />
            Shuffle
          </button>
          {shuffleN > 0 ? (
            <button
              type="button"
              onClick={() => setShuffleN(0)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <ListOrdered className="size-4" />
              Textbook order
            </button>
          ) : null}
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
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <Printer className="size-4" />
            Print / save PDF
          </button>
        </div>
      </div>
      <TextbookPage
        lesson={lesson}
        showMeanings={showMeanings}
        vocab={vocab}
        phrases={phrases}
        activeIndex={readIndex}
      />
    </main>
  );
}
