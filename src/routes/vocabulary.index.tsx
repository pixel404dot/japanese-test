import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { LessonCatalog } from "@/components/lesson-catalog";
import { SpeakButton } from "@/components/speak-button";
import { APPENDIX_INDEX, VOCAB_INDEX } from "@/lib/vocab-index";
import { lessonScore } from "@/lib/srs";
import { unlockSpeech } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/vocabulary/")({
  component: VocabularyPage,
});

function VocabularyPage() {
  const total = VOCAB_INDEX.reduce((n, lesson) => n + lesson.wordCount, 0);
  const srs = useKanaStore((s) => s.vocabSrs);
  const setSettings = useKanaStore((s) => s.setSettings);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [vocabMod, setVocabMod] = useState<typeof import("@/lib/vocab") | null>(null);
  const allKeys = VOCAB_INDEX.flatMap((lesson) => lesson.keys);
  const overall = lessonScore(allKeys, srs);
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (!searching || vocabMod) return;
    let cancelled = false;
    void import("@/lib/vocab").then((mod) => {
      if (!cancelled) setVocabMod(mod);
    });
    return () => {
      cancelled = true;
    };
  }, [searching, vocabMod]);

  const hits = useMemo(() => {
    const q = query.trim();
    if (!q || !vocabMod) return [];
    return [
      ...vocabMod.VOCAB_LESSONS,
      vocabMod.NUMERALS_LESSON,
      vocabMod.MONEY_LESSON,
    ].flatMap((lesson) =>
      lesson.words
        .filter((word) => vocabMod.wordMatches(word, q))
        .map((word) => ({ word, lesson })),
    );
  }, [query, vocabMod]);

  return (
    <main className="page">
      <PageHeader
        backTo="/"
        backLabel="Studio"
        glyph="語"
        title="Vocabulary"
        description="Minna no Nihongo vocabulary, with English and Bangla. Open a lesson to listen, then drill."
      >
        {overall.known > 0 ? (
          <p className="mt-3 text-sm text-muted">
            {overall.known} / {overall.total} known
            {overall.due > 0 ? ` · ${overall.due} due` : ""}
          </p>
        ) : null}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 日本語, English, বাংলা"
          aria-label="Search all vocabulary"
          className="field mt-6"
        />
      </PageHeader>

      {searching ? (
        <div className="mb-10">
          <p className="kicker mb-3">
            {!vocabMod
              ? "Searching"
              : `${hits.length} match${hits.length === 1 ? "" : "es"}`}
          </p>
          {!vocabMod ? (
            <p className="text-sm text-muted">Looking through the lessons…</p>
          ) : hits.length === 0 ? (
            <p className="text-sm text-muted">No matches.</p>
          ) : (
            <ul className="space-y-2">
              {hits.map(({ word, lesson }, i) => (
                <li
                  key={`${lesson.id}-${word.jp}-${i}`}
                  className="panel flex items-start gap-1 p-3"
                >
                  <SpeakButton text={word.jp} />
                  <Link
                    to="/vocabulary/$lessonId"
                    params={{ lessonId: lesson.id }}
                    className="min-w-0 flex-1 pt-2 no-underline"
                  >
                    <p className="font-kana text-xl leading-none text-fg">
                      {word.jp}
                    </p>
                    <p className="mt-2 text-sm text-muted">{word.meaning}</p>
                    <p className="mt-0.5 font-bn text-sm text-subtle">{word.bn}</p>
                    <p className="kicker mt-3">Lesson {lesson.number}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {overall.due > 0 ? (
            <button
              type="button"
              onClick={() => {
                unlockSpeech();
                setSettings({
                  vocabLessonId: "all",
                  words: true,
                  reviewOnly: true,
                  noRepeat: true,
                  sessionMode: "count",
                  countValue: overall.due,
                  focusKeys: null,
                });
                void navigate({ to: "/practice" });
              }}
              className="mb-6 flex min-h-16 w-full items-center justify-between rounded-2xl bg-accent px-5 text-left text-accent-fg"
            >
              <span>
                <span className="block font-display text-lg">Review due</span>
                <span className="text-sm text-accent-fg/80">
                  {overall.due} word{overall.due === 1 ? "" : "s"} ready
                </span>
              </span>
              <ChevronRight className="size-4" />
            </button>
          ) : null}

          <LessonCatalog
            extras={[
              {
                lessonId: "numerals",
                mark: "数",
                title: APPENDIX_INDEX[0]?.title ?? "Numerals",
                meta: `${APPENDIX_INDEX[0]?.wordCount ?? 0} readings · appendix`,
                keys: APPENDIX_INDEX[0]?.keys,
              },
              {
                lessonId: "money",
                mark: "¥",
                title: APPENDIX_INDEX[1]?.title ?? "Money",
                meta: `${APPENDIX_INDEX[1]?.wordCount ?? 0} prices`,
                keys: APPENDIX_INDEX[1]?.keys,
              },
            ]}
          />
        </>
      )}

      <div className="mt-10 flex justify-center pb-4">
        <Link
          to="/vocabulary/$lessonId"
          params={{ lessonId: "all" }}
          className="inline-flex h-12 min-w-48 items-center justify-center rounded-full bg-accent px-6 text-base font-medium text-accent-fg no-underline hover:opacity-90"
        >
          All {total} words
        </Link>
      </div>
    </main>
  );
}
