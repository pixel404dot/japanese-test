import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Languages,
  Layers,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { ReadAloudButton } from "@/components/read-aloud-button";
import { SpeakButton } from "@/components/speak-button";
import { Spoiler } from "@/components/spoiler";
import { cn } from "@/lib/cn";
import {
  KANJI_ITEMS,
  KANJI_LESSON_ID,
  kanjiMatches,
  kanjiSpeak,
  type KanjiItem,
} from "@/lib/kanji";
import { SINGLE_KANJI, SINGLE_KANJI_LESSON_ID } from "@/lib/kanji-n5";
import { lessonScore } from "@/lib/srs";
import { unlockSpeech } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/kanji")({ component: KanjiPage });

function Row({
  item,
  showMeanings,
  active,
  rowId,
}: {
  item: KanjiItem;
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
      <SpeakButton text={kanjiSpeak(item)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 pt-2">
            <p className="text-xs tabular-nums text-subtle">{item.n}</p>
            <p className="font-kana text-3xl leading-none">{item.kanji}</p>
          </div>
          <Spoiler>{`${item.reading} · ${item.romaji}`}</Spoiler>
        </div>
        {showMeanings ? (
          <>
            <p className="mt-2 text-sm text-fg">{item.meaning}</p>
            <p className="mt-0.5 font-bn text-sm text-muted">{item.bn}</p>
            {item.note ? (
              <p className="mt-0.5 text-xs text-subtle">{item.note}</p>
            ) : null}
          </>
        ) : (
          <>
            <Spoiler variant="line" label="English meaning">
              {item.meaning}
            </Spoiler>
            <Spoiler variant="line" label="Bangla meaning" className="font-bn">
              {item.bn}
            </Spoiler>
            {item.note ? (
              <Spoiler variant="line" label="note" className="text-xs">
                {item.note}
              </Spoiler>
            ) : null}
          </>
        )}
      </div>
    </li>
  );
}

function KanjiPage() {
  const showMeanings = useKanaStore((s) => s.settings.showVocabMeanings);
  const setSettings = useKanaStore((s) => s.setSettings);
  const srs = useKanaStore((s) => s.vocabSrs);
  const navigate = useNavigate();
  const [section, setSection] = useState<"single" | "words">("single");
  const [query, setQuery] = useState("");
  const [readIndex, setReadIndex] = useState(-1);
  const lessonId = section === "single" ? SINGLE_KANJI_LESSON_ID : KANJI_LESSON_ID;
  const source = section === "single" ? SINGLE_KANJI : KANJI_ITEMS;
  const keys = source.map((i) => `${lessonId}-${i.n}`);
  const score = lessonScore(keys, srs);
  const items = useMemo(
    () => source.filter((i) => kanjiMatches(i, query)),
    [query, source],
  );

  useEffect(() => {
    if (readIndex < 0) return;
    document
      .getElementById(`kanji-row-${readIndex}`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [readIndex]);

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
        to="/"
        className="back-link"
      >
        <ArrowLeft className="size-3.5" />
        Studio
      </Link>
      <p className="glyph mt-5">漢</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Kanji</h1>
      <p className="mt-3 max-w-xl text-muted">
        Single N5 kanji, then the word list. Tap a reading to listen, then drill.
      </p>
      {score.known > 0 ? (
        <p className="mt-3 text-sm text-muted">
          {score.known} / {score.total} known
          {score.due > 0 ? ` · ${score.due} due` : ""}
        </p>
      ) : null}

      <div className="mt-6 flex gap-2" role="tablist" aria-label="Kanji lists">
        {(
          [
            { id: "single" as const, label: "Single", count: SINGLE_KANJI.length },
            { id: "words" as const, label: "Words", count: KANJI_ITEMS.length },
          ]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={section === tab.id}
            onClick={() => {
              setSection(tab.id);
              setReadIndex(-1);
            }}
            className={cn(
              "min-h-11 flex-1 rounded-full px-4 text-sm font-medium",
              section === tab.id
                ? "bg-fg text-bg"
                : "bg-elevated text-muted shadow-[var(--shadow-border)]",
            )}
          >
            {tab.label}
            <span className="ml-2 tabular-nums">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
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
                startPractice({
                  vocabPrompt: "listen",
                  reviewOnly: false,
                  touch: true,
                }),
            },
            {
              id: "meaning",
              label: "Meaning",
              icon: Languages,
              run: () =>
                startPractice({
                  vocabPrompt: "meaning",
                  reviewOnly: false,
                  touch: true,
                }),
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
          ] as const
        ).map((tile) => {
          const Icon = tile.icon;
          return (
            <button
              key={tile.id}
              type="button"
              disabled={"disabled" in tile ? tile.disabled : false}
              onClick={() => tile.run()}
              className="panel flex min-h-24 flex-col items-center justify-center gap-2 p-4 text-sm font-medium text-fg disabled:opacity-40"
            >
              <Icon className="size-6" />
              {tile.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 漢字, ひらがな, English, বাংলা"
          aria-label="Search kanji"
          className="field sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <ReadAloudButton
            words={items.map((i) => ({ jp: kanjiSpeak(i), bn: i.bn }))}
            onCurrent={setReadIndex}
          />
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

      <p className="kicker mt-6">
        {items.length} {items.length === 1 ? "entry" : "entries"}
      </p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No matches.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <Row
              key={`${item.n}-${item.kanji}`}
              item={item}
              showMeanings={showMeanings}
              active={readIndex === i}
              rowId={`kanji-row-${i}`}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
